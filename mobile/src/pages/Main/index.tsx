import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {BorderlessButton, TextInput} from 'react-native-gesture-handler';
import {Svg, Circle, Rect} from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

import FileItemComponent from '../../components/FileItem';

import {
  useLoadFiles,
  useFiles,
  useFileClearError,
  useFileHasError,
} from '../../files';

const {width: viewWidth, height: viewHeight} = Dimensions.get('screen');

import styles from './styles';

const Main: React.FC = () => {
  const navigation = useNavigation();
  const files = useFiles();
  const loadFiles = useLoadFiles();
  const error = useFileHasError();
  const clearError = useFileClearError();
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState('');

  function handlerNewFile(): void {
    navigation.navigate('NEW_FILE');
  }

  useEffect(() => {
    if (error) {
      console.error('an error ocurred');
      clearError();
    }
  }, [error, clearError]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  function toggleModal() {
    setShowModal((oldShowModal) => !oldShowModal);
  }

  function handlerSearch() {
    loadFiles(query);
    setShowModal(false);
    Keyboard.dismiss();
  }

  return (
    <>
      <KeyboardAvoidingView style={{flex: 1}} enabled={false} behavior="height">
        <View style={styles.container}>
          <Modal
            avoidKeyboard={true}
            onBackdropPress={() => toggleModal()}
            isVisible={showModal}
            useNativeDriver
            style={styles.modal}>
            <View style={styles.modalContainer}>
              <Text style={styles.textModalTitle}>Search</Text>
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Enter your search"
                style={styles.textInputModalTitle}
              />
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  onPress={() => setQuery('')}
                  style={styles.button}>
                  <Text style={{color: '#E7395E'}}>CLEAR</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlerSearch} style={styles.button}>
                  <Text style={{color: '#6B26BB'}}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <BorderlessButton
            onPress={toggleModal}
            borderless={false}
            style={styles.search}>
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
      </KeyboardAvoidingView>
    </>
  );
};

export default Main;
