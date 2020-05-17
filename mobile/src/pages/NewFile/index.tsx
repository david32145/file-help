import React, {useState, useMemo, useEffect} from 'react';
import {
  View,
  Dimensions,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {Svg, Rect} from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DocumentPicker from 'react-native-document-picker';
import {useAddFile, useFileClearError, useFileHasError} from '../../files';

const {width: viewWidth, height: viewHeight} = Dimensions.get('screen');

import styles from './styles';

interface Picker {
  uri: string;
  type: string;
  name: string;
  size: string;
}

const NewFile: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [picker, setPicker] = useState<Picker | undefined>();
  const [label, setLabel] = useState('');

  const addFile = useAddFile();
  const error = useFileHasError();
  const clearError = useFileClearError();

  const labels = useMemo(() => {
    if (label.trim() === '') {
      return [];
    }
    return label.split(',').map((str) => str.trim());
  }, [label]);
  const navigation = useNavigation();

  useEffect(() => {
    if (error) {
      console.error('an error ocurred');
      clearError();
    }
  }, [error, clearError]);

  function handlerGoBack(): void {
    navigation.goBack();
  }

  async function handlerDocumentPicker(): Promise<void> {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setPicker(file);
      console.log(file);
    } catch (err) {
      console.error(err);
    }
  }

  async function handlerSave(): Promise<void> {
    try {
      if (picker) {
        const data = new FormData();
        const file = {
          uri: picker.uri,
          type: picker.type,
          name: picker.name,
          fileName: picker.name,
          size: picker.size,
        };
        data.append('file', file);
        data.append('title', name);
        data.append('description', description);
        data.append('labels', label);
        addFile(data);
        navigation.goBack();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <View style={styles.container}>
      <BorderlessButton
        onPress={handlerGoBack}
        borderless={false}
        style={styles.search}>
        <Icon name="keyboard-backspace" color="#FFF" size={24} />
      </BorderlessButton>
      <ScrollView
        contentContainerStyle={{paddingVertical: 20}}
        style={styles.form}
        showsVerticalScrollIndicator={false}>
        <View style={styles.inputGroup}>
          <Text style={styles.textInput}>Name</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.textInput}>Description</Text>
          <TextInput
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
            style={[styles.input, styles.inputDescription]}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.textInput}>File</Text>
          <TouchableOpacity
            onPress={handlerDocumentPicker}
            style={[styles.input, styles.inputFile]}>
            <Text style={styles.previewName}>{picker?.name}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.textInput}>Labels</Text>
          <TextInput
            value={label}
            onChangeText={setLabel}
            style={styles.input}
          />
        </View>
        {labels.length > 0 && (
          <View style={styles.fileBoxItemLabels}>
            {labels.map((lbl) => (
              <Text style={styles.label} key={lbl}>
                {lbl}
              </Text>
            ))}
          </View>
        )}

        <BorderlessButton
          onPress={handlerSave}
          style={styles.saveButton}
          borderless={false}>
          <Text style={styles.saveButtonText}>Save</Text>
        </BorderlessButton>
      </ScrollView>
      <View style={styles.header}>
        <Svg
          width="100%"
          height={viewHeight * 0.4}
          style={{position: 'absolute', top: 0, left: 0}}>
          <Rect
            translateX={450}
            translateY={-150}
            width={viewWidth}
            height={viewHeight}
            fill="#FFF"
            rotation={45}
            fillOpacity={0.25}
          />
        </Svg>
        <Text style={styles.mainText}>Create new file</Text>
        <Text style={styles.secondaryText}>
          Informe name, description and add labels to files for search in future
        </Text>
      </View>
    </View>
  );
};

export default NewFile;
