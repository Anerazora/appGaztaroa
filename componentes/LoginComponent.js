//import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from 'firebase/app';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button, Alert } from 'react-native';
import { colorGaztaroaOscuro, colorGaztaroaClaro } from '../comun/comun';
//import { firebaseConfig } from '../comun/firebaseConfig';
import app from "../firebaseConfig";
import React, { Component } from 'react';
import { Card } from "react-native-elements";
import 'firebase/storage';
import { getStorage, ref, putFile, child, put, blob, uploadBytes, getDownloadURL, uploadBytesResumable} from "firebase/storage";
//import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button, Alert } from 'react-native';
//import { colorGaztaroaOscuro, colorGaztaroaClaro } from '../comun/comun';
//import firebase from 'firebase/app';
//import auth from 'firebase/auth';
//import { firebaseConfig } from '../comun/firebaseConfig';
//import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
//import { initializeApp } from "firebase/app";
//const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage (app);

import 'firebase/auth';
//import { Card } from "react-native-elements";
import { CardImage } from "@rneui/base/dist/Card/Card.Image";
import { Pressable } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import { Image } from "react-native-elements";

function showAlert(title, text) {
    Alert.alert(
        title,
        text,
        [
            {
                text: "OK",
                style: "cancel"
            },
        ],
        { cancelable: true }
    )
};
async function openImagePicker () {
        // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        // if (status !== 'granted') {
        //   console.log('no tiene permisos para acceder a la galería')
        // } else {
            //const result = await ImagePicker.launchImageLibraryAsync();
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            console.log('Resultado en la funcion del picker'+result)
            if (!result.canceled) {
                //console.log(result.assets[0].uri)
                //console.log(result.assets && result.assets.length > 0 ? result.assets[0].uri : 'No se seleccionó ninguna imagen');
                return(result)
                //this.setState({ selectedImage: result.assets[0].uri });
                // if (!result.cancelled) {
                //   // La imagen fue seleccionada exitosamente
                //   console.log(result.uri);
                // } 
            }
            else {
                return(
                    console.log('SE HA CANCELADO LA ACCION')
                    //<View></View>
                    
                    )
            } 
        // }
}
async function guardarImagenEnStorage (uri, nombreArchivo) {
        
    console.log('el nombre del archivo que recibe la funcion es: '+nombreArchivo);
    console.log('la uri que recibe la funcion es: '+uri)
    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage,`users/${nombreArchivo}`);
        uploadBytesResumable(storageRef, blob);
        return (console.log('se ha subido la imagen correctamente!'))
        //const snapshot = uploadBytesResumable(storageRef, blob);
        // let URLStorage = await getDownloadURL(snapshot.ref);
        // return(URLStorage)
        //console.log('Imagen subida exitosamente');
    } catch (error) {
        console.log('Error al subir la imagen:', error);
    }
    // const imagenRef = storageRef.child(`users/${nombreArchivo}`);
    // console.log(imagenRef)
    // try {
    //   await imagenRef.putFile(uri);
    //   console.log('La imagen se ha guardado correctamente en Firebase Storage');
    // } catch (error) {
    //   console.error('Error al guardar la imagen en Firebase Storage:', error);
    // }
};
// function devolverURLImagenUser (nombreFoto) {
//     const storageRef = ref(storage,`users/${nombreFoto}`);
//     const URLImagen = getDownloadURL(storageRef)
//     console.log('esta la URL del storage del user: '+ URLImagen)
//     return (URLImagen)
// }
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initializing: true,
            user: null,
            email: '',
            password: '',
            password2: '',
            signin: false,
            selectedImage: null,
            mostrarImagen: false,
            ImagenUser: null,
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                console.log("LOGUEADO");
                this.setState({ user: user });
                // this.devolverURLImagenUser(this.state.user.uid)
            } else {
                console.log("NO LOGUEADO");
            }
        });
        
    }

    handleLogin = () => {
        if (this.state.signin) {
            this.setState({ signin: false });

        } else {
            const { email, password } = this.state;

            signInWithEmailAndPassword(auth, email, password).then(() => this.props.navigation.navigate('Home')).catch(error => { console.log(error); showAlert("Error", error.message) });
        }

    };

    handleSignIn = () => {
        console.log('Esto es la variable sigin'+this.state.signin);

        if (!this.state.signin) {
            this.setState({ signin: true });
        } else {
            if (this.state.password == this.state.password2) {
                //this.windowRef.recaptchaVerifier = new auth.RecaptchaVerifier('recaptcha-container');
                createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
                    .then((res) => {
                        console.log('Usuario registrado')
                        this.setState({
                            user: res.user,
                        });
                        showAlert("Registrado correctamente");
                    })
                    .catch(error => { console.log(error); showAlert("Error", error.message) });
                //.catch((error) => {
                // if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
                //  alert("The password is too weak");
                // }
                // });

            } else {
                showAlert("Error", "Las contraseñas no coinciden");
            }
        }
    };

    // openImagePicker = async () => {
    //     // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     // if (status !== 'granted') {
    //     //   console.log('no tiene permisos para acceder a la galería')
    //     // } else {
    //         //const result = await ImagePicker.launchImageLibraryAsync();
    //         let result = await ImagePicker.launchImageLibraryAsync({
    //             mediaTypes: ImagePicker.MediaTypeOptions.All,
    //             allowsEditing: true,
    //             aspect: [4, 3],
    //             quality: 1,
    //           });
    //         console.log(result)
    //         if (!result.canceled) {
    //             //console.log(result.assets[0].uri)
    //             console.log(result.assets && result.assets.length > 0 ? result.assets[0].uri : 'No se seleccionó ninguna imagen');

    //             this.setState({ selectedImage: result.assets[0].uri });
    //             // if (!result.cancelled) {
    //             //   // La imagen fue seleccionada exitosamente
    //             //   console.log(result.uri);
    //             // } 
    //         }
    //         else {
    //             console.log('SE HA CANCELADO LA ACCION')
    //         } 
    //     // }
    // }
    handleGaleria = async () => {
        const Image = await openImagePicker();
        console.log('resultado en el handle: '+Image)
        
        if ( !Image.canceled){
            this.setState({selectedImage: Image.assets[0].uri})
            this.setState({mostrarImagen: true})
            console.log('El UID de usuario es: '+ this.state.user.uid)
            console.log('Ahora el estado de selectedimage es la URI: '+this.state.selectedImage)

            try{
                
            // const URLImage = await guardarImagenEnStorage(this.state.selectedImage, this.state.user.uid)
            // console.log( 'URL de la imagen guardada en firestore'+URLImage)
            await guardarImagenEnStorage(this.state.selectedImage, this.state.user.uid)
            } catch (error){
                console.log('error de guardar imagen en store. '+error)
            }
            // const URLImagen = devolverURLImagenUser (this.state.user.uid)
            // this.setState({ImagenUser: URLImagen})

        } else {
            console.log('handle galeria ha fallado')
        }
        
    }

    // guardarImagenEnStorage = async (uri, nombreArchivo) => {
        
    //     console.log(nombreArchivo);
    //     console.log(uri)
    //     try {
    //         const response = await fetch(uri);
    //         const blob = await response.blob();
    //         const storageRef = ref(storage,`users/${nombreArchivo}`);
    //         await uploadBytesResumable(storageRef, blob);
    //         console.log('Imagen subida exitosamente');
    //     } catch (error) {
    //         console.log('Error al subir la imagen:', error);
    //     }
    //     // const imagenRef = storageRef.child(`users/${nombreArchivo}`);
    //     // console.log(imagenRef)
    //     // try {
    //     //   await imagenRef.putFile(uri);
    //     //   console.log('La imagen se ha guardado correctamente en Firebase Storage');
    //     // } catch (error) {
    //     //   console.error('Error al guardar la imagen en Firebase Storage:', error);
    //     // }
    // };

    render() {
      
        if (this.state.user) {
            // this.setState({ImagenUser: devolverURLImagenUser(this.state.user.uid)})
            // const URLImagen = devolverURLImagenUser (this.state.user.uid)
            // console.log(URLImagen)
            // this.setState({ImagenUser: URLImagen})
            return (
                <View >
                    <Card>
                        {/* <Text style={styles.logintext}> Bienvenido {this.state.user.email} !</Text> */}
                        <Card.Title>Bienvenido {this.state.user.email} !</Card.Title>
                        <Card.Divider/>
                        <View  style={styles.vistaCard}>
                            <Text>Nombre de usuario: {this.state.user.email} </Text>
                                
                                 {this.state.mostrarImagen === false ? (
                                    <Card.Image style={styles.imagenUser}
                                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/appgaztaroa-53ec5.appspot.com/o/user.jpeg?alt=media&token=351a3536-17b1-49fb-baa8-09720856102a' }}></Card.Image>
                                 ) : (
                                    <Card.Image style={styles.imagenUser}
                                    source={{ uri: this.state.selectedImage}}></Card.Image>
                                 )}   
                                                        
                                    <Pressable  
                                    style={styles.botonAnadirImagen}
                                    onPress={() => this.handleGaleria()}>
                                        <Text>Añadir imagen de perfil</Text>
                                    </Pressable>
                              
                            <Button style={styles.logout}
                                onPress={() => auth.signOut().then(() => {
                                    console.log("SignOut OK");
                                }).catch((error) => {
                                    console.log("SignOut ERROR");
                                })}
                                title="Salir"
                                color="#f70000" />
                        </View>
                    </Card>
                </View>
            )

        } else if (this.state.signin) {
            return (
                <View style={styles.container}>
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        placeholder='Email'
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        placeholder='Contraseña'
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.password2}
                        onChangeText={password2 => this.setState({ password2 })}
                        placeholder='Repetir contraseña'
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleSignIn}>
                        <Text style={styles.buttonText}>Crear cuenta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button2}
                        onPress={this.handleLogin}>
                        <Text style={styles.buttonText}>Volver</Text>
                    </TouchableOpacity>

                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        placeholder='Email'
                        autoCapitalize='none'
                    />

                    <TextInput
                        style={styles.inputBox}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        placeholder='Contraseña'
                        secureTextEntry={true}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleLogin}>
                        <Text style={styles.buttonText}>Acceder</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button2}
                        onPress={this.handleSignIn}>
                        <Text style={styles.buttonText}>Crear cuenta</Text>
                    </TouchableOpacity>

                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: '85%',
        margin: 5,
        padding: 10,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
        width: '85%',
        alignItems: 'center',
        backgroundColor: colorGaztaroaOscuro,
        borderColor: colorGaztaroaClaro,
        borderWidth: 1,
        borderRadius: 5,
    },
    button2: {
        marginTop: 20,
        marginBottom: 20,
        width: '85%',
        alignItems: 'center',
        backgroundColor: colorGaztaroaClaro,
        borderColor: colorGaztaroaClaro,
        borderWidth: 1,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    logintext: {
        marginBottom: 30,
        fontSize: 18,
        fontWeight: 'bold',
    },
    vistaCard: {
        flexDirection: 'column',
    },
    vistaCard2: {
        flexDirection: 'row'
    },
    botonAnadirImagen: {
        backgroundColor: '#b2dafa',
        alignSelf: 'center',
        padding: '4%',
        marginBottom: '5%',
        borderRadius: '20%',
        maxWidth: '50%',
    },
    imagenUser: {
        width: 100,
        height: 100
    }

})

export default Login;