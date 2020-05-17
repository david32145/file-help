import React from 'react';
import {View, Image, Text, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import mimeType from 'mime-types';
import {isToday, isYesterday, format} from 'date-fns';

import styles from './styles';

import pdfIcon from '../../assets/pdf_icon.png';
import ImageIcon from '../../assets/image_icon.png';
import unknownIcon from '../../assets/unknown_icon.png';

export interface FileItem {
  id: number;
  title: string;
  description: string;
  file_name: string;
  uri: string;
  createdAt: string;
  updateAt: string;
  labels: {
    value: string;
  }[];
}

interface FileItemProps {
  data: FileItem;
}

const FileItemComponent: React.FC<FileItemProps> = ({data}) => {
  function getIconByType(file_name: string): number {
    function includes<T>(array: T[], value: T): boolean {
      return !!array.find((item) => item === value);
    }
    const mime = mimeType.lookup(file_name);
    if (!mime) {
      return unknownIcon;
    }
    const imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (includes(imageMimeTypes, mime)) {
      return ImageIcon;
    }
    if (mime === 'application/pdf') {
      return pdfIcon;
    }
    return unknownIcon;
  }

  function formatDate(str: string): string {
    const date = new Date(str);
    if (isToday(date)) {
      return `Today at ${date.getHours()}h`;
    }
    if (isYesterday(date)) {
      return `Yesterday at ${date.getHours()}h`;
    }
    return format(date, 'MMMM d, y');
  }

  async function handlerOpenFile(uri: string): Promise<void> {
    const isSupported = await Linking.canOpenURL(uri);
    if (isSupported) {
      await Linking.openURL(uri);
    } else {
      console.error('can not open uri');
    }
  }

  return (
    <View style={styles.fileBoxItem}>
      <Image
        source={getIconByType(data.file_name)}
        style={styles.fileBoxItemCircle}
      />
      <View style={styles.fileBoxItemMain}>
        <View style={styles.fileBoxItemHeader}>
          <Text style={styles.fileName}>{data.title}</Text>
          <Text style={styles.fileTimestamp}>{formatDate(data.createdAt)}</Text>
        </View>
        <View style={styles.fileBoxContent}>
          <Text numberOfLines={2} style={styles.fileDescription}>
            {data.description}
          </Text>
          <Icon
            style={{
              transform: [{rotate: '135deg'}],
            }}
            onPress={() => handlerOpenFile(data.uri)}
            name="link"
            color="#000"
            size={24}
          />
        </View>
      </View>
      <View style={styles.fileBoxItemLabels}>
        {data.labels.map((label) => (
          <Text style={styles.label} key={label.value}>
            {label.value}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default FileItemComponent;
