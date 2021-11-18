import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  mapa: {
    flex: 1,
    marginBottom: 60
  },
  covidContainer: {
    backgroundColor: '#FFF',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'column',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  covidHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 10
  },
  covidBar: {
    width: 100,
    height: 2,
    backgroundColor: 'gray',
    marginBottom: 20,
    borderRadius: 10
  },
  covidTitle: {
    fontSize: 23,
    color: '#000',
    textAlign: 'center'
  },
  covidCounts: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    marginVertical: 10
  },
  covidCountCard: {
    flexDirection: 'column',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: 'red',
    marginHorizontal: 5,
    elevation: 2
  },
  covidCountCardConfirmed: {
    backgroundColor: 'gray'
  },
  covidCountCardCritical: {
    backgroundColor: 'orange'
  },
  covidCountCardDeath: {
    backgroundColor: 'red'
  },
  covidCountCardRecovered: {
    backgroundColor: '#1dab1b'
  },
  covidCountCardLabel: {
    fontSize: 10,
    color: '#eee'
  },
  covidCountCardValue: {
    fontSize: 16,
    color: '#fff'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  modalContent: {
    backgroundColor: '#FFF',
    flex: 1,
    marginHorizontal: 40,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'column'
  },
  modalCity: {
    fontSize: 23,
    color: '#000',
    marginBottom: 10,
    textAlign: 'center'
  },
  modalTitle: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'left'
  },
  modalText: {
    fontSize: 13,
    color: '#000',
    textAlign: 'left'
  }
})
