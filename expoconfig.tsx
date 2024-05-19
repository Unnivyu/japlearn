import Constants from 'expo-constants';

const { manifest } = Constants;
let localhost = 'http://localhost:8080'; // Default to localhost

if (manifest && manifest.debuggerHost) {
    localhost = `http://${manifest.debuggerHost.split(':').shift()}:8080`;
}

const expoconfig = {
    API_URL: localhost, // You can also set it to a specific IP address if needed
};

export default expoconfig;



