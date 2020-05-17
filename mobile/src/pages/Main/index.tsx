import React, {useState, useEffect} from 'react';
import {View, Dimensions, Text, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {Svg, Circle, Rect} from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

import FileItemComponent from '../../components/FileItem';

import api from '../../services/api';

const {width: viewWidth, height: viewHeight} = Dimensions.get('screen');

import styles from './styles';

import {FileItem} from '../../components/FileItem';

const Main: React.FC = () => {
  const navigation = useNavigation();
  const [files, setFiles] = useState<FileItem[]>([]);

  function handlerNewFile(): void {
    navigation.navigate('NEW_FILE');
  }

  useEffect(() => {
    loadFiles();
  }, []);

  async function loadFiles() {
    const response = await api.get<FileItem[]>('/files');
    setFiles(response.data);
  }

  return (
    <View style={styles.container}>
      <BorderlessButton borderless={false} style={styles.search}>
        <Icon name="search" color="#FFF" size={24} />
      </BorderlessButton>
      <View style={styles.fileBox}>
        <View style={styles.fileBoxDecorator} />
        <View style={styles.fileBoxHeader}>
          <Text style={styles.fileBoxHeaderTitle}>My Files</Text>
          <BorderlessButton
            onPress={handlerNewFile}
            borderless={false}
            style={styles.buttonNewFile}>
            <Icon name="add-circle" color="#FFF" size={24} />
          </BorderlessButton>
        </View>
        <FlatList
          data={files}
          contentContainerStyle={{
            paddingHorizontal: 40,
            paddingTop: 10,
          }}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => <FileItemComponent data={item} />}
        />
      </View>
      <Svg
        width="100%"
        height={viewHeight * 0.4}
        style={{position: 'absolute', top: 0, left: 0}}>
        <Rect
          translateX={300}
          translateY={-100}
          width={viewWidth}
          height={viewHeight}
          fill="#FFF"
          rotation={50}
          fillOpacity={0.25}
        />
        <Circle cx={viewWidth * 0.93} cy="70" r="95" fill="#E6A21A" />
        <Circle cx={viewWidth * 0.5} cy="70" r="20" fill="#6B26BB" />
        <Circle
          cx={viewWidth * 0.7}
          cy={viewHeight * 0.32}
          r="60"
          fill="#6B26BB"
        />
      </Svg>
      <Text style={styles.mainText}>File Help</Text>
      <Text style={styles.secondaryText}>
        An awesome app for save your documents
      </Text>
    </View>
  );
};

export default Main;
