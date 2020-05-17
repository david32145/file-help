import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  fileBoxItem: {
    position: 'relative',
    height: 110,
    paddingHorizontal: 25,
    elevation: 5,
    borderRadius: 25,
    backgroundColor: '#FFF',
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  fileBoxItemCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  fileBoxItemMain: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
  },

  fileBoxItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fileBoxContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  fileName: {
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
  },
  fileDescription: {
    fontSize: 14,
    color: '#5C5C5C',
    fontWeight: '300',
    width: '80%',
  },
  fileTimestamp: {
    fontSize: 10,
    color: '#808080',
    fontWeight: '300',
  },
  fileBoxItemLabels: {
    position: 'absolute',
    bottom: 5,
    right: '20%',
    flexDirection: 'row',
  },
  label: {
    fontSize: 8,
    marginLeft: 5,
    backgroundColor: '#E7395E',
    color: '#FFF',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    textTransform: 'uppercase',
  },
});
