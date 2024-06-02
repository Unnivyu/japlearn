import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8ED94D',
    padding: 10,
    width:  '100%',
    borderRadius: 5,
    borderColor: '#8AC25A',
    borderBottomWidth: 6,
    height: 80,
  },

  buttonText: {
    color: '#fff',
    fontSize: 40
  },

  buttonContainer: {
    alignItems:'center',
    marginTop: 50,
  },

  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: 50,
  },

  input: {
    backgroundColor: '#ececec',
    color: '#777676',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    height: 60,
    borderColor: 'red',
  },

  imageContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },
  
  linkContainer: {
    marginTop: 60,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  linkText: {
      color: '#B6B5B5',
      textDecorationLine: 'underline',
      fontSize: 12,
  },

});

export default styles;