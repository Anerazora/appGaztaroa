//import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import firebase from 'firebase/app';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button, Alert, Imagen } from 'react-native';
import { colorGaztaroaOscuro, colorGaztaroaClaro } from '../comun/comun';
//import { firebaseConfig } from '../comun/firebaseConfig';
import app from "../firebaseConfig";
import React, { Component } from 'react';
import { Card } from "react-native-elements";
import 'firebase/storage';
import { getStorage, ref, putFile, child, put, blob, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
//import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button, Alert } from 'react-native';
//import { colorGaztaroaOscuro, colorGaztaroaClaro } from '../comun/comun';
//import firebase from 'firebase/app';
//import auth from 'firebase/auth';
//import { firebaseConfig } from '../comun/firebaseConfig';
//import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
//import { initializeApp } from "firebase/app";
//const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

import 'firebase/auth';

import { CardImage } from "@rneui/base/dist/Card/Card.Image";
import { Pressable } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import { Image } from "react-native-elements";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { update } from "firebase/database";

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
async function openImagePicker() {
   
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });
    console.log('Resultado en la funcion del picker' + result)
    if (!result.canceled) {
        
        return (result)
        
    }
    else {
        return (
            console.log('SE HA CANCELADO LA ACCION')
            //<View></View>

        )
    }
   
}
async function guardarImagenEnStorage(uri, nombreArchivo) {

    console.log('el nombre del archivo que recibe la funcion es: ' + nombreArchivo);
    console.log('la uri que recibe la funcion es: ' + uri)
    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `users/${nombreArchivo}`);
        uploadBytesResumable(storageRef, blob);
        return (console.log('se ha subido la imagen correctamente!'))
        
    } catch (error) {
        console.log('Error al subir la imagen:', error);
    }
   
};

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
            //photoURL: null,
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                console.log("LOGUEADO");
                this.setState({ user: user });
                
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
        console.log('Esto es la variable sigin' + this.state.signin);


        if (!this.state.signin) {
            this.setState({ signin: true });
        } else {
            if (this.state.password == this.state.password2) {
                //this.windowRef.recaptchaVerifier = new auth.RecaptchaVerifier('recaptcha-container');
                createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
                    .then((res) => {
                        //const user = res.user;

                        console.log('Usuario registrado')

                        this.setState({
                            user: res.user,
                        });
                        const defaultPhotoUrl = 'https://firebasestorage.googleapis.com/v0/b/appgaztaroa-53ec5.appspot.com/o/user.jpeg?alt=media&token=351a3536-17b1-49fb-baa8-09720856102a';
                        //console.log('Este es el uid del usuario registrado' + this.state.user.uid);
                        guardarImagenEnStorage(defaultPhotoUrl, res.user.uid);

                        this.devolverURLImagenUser(res.user.uid)
                        console.log(this.state.ImagenUser)
                        // . then(() => {
                        //     updateProfile(res.user, {
                        //         photoURL: this.state.ImagenUser,
                        //     });
                        // })
                        
                        // updateProfile(res.user, {
                        //     photoURL: this.state.ImagenUser,
                        // });
                        // this.setState({ImagenUser: avatar})
                        showAlert("Registrado correctamente");


                    // }).then(() => {
                    //     console.log( 'estado despues de devolver la imagen'+this.state.ImagenUser)
                    //     updateProfile(this.state.user.uid, {
                    //         photoURL: this.state.ImagenUser,
                    //     });
                    })
                    .catch(error => { console.log(error); showAlert("Error", error.message) });
               

            } else {
                showAlert("Error", "Las contraseñas no coinciden");
            }
        }
    };

    
    handleGaleria = async () => {
        const Image = await openImagePicker();
        console.log('resultado en el handle: ' + Image)

        if (!Image.canceled) {
            this.setState({ selectedImage: Image.assets[0].uri })
        
            console.log('El UID de usuario es: ' + this.state.user.uid)
            console.log('Ahora el estado de selectedimage es la URI: ' + this.state.selectedImage)

            try {

                await guardarImagenEnStorage(this.state.selectedImage, this.state.user.uid)
            } catch (error) {
                console.log('error de guardar imagen en store. ' + error)
            }
        

        } else {
            console.log('handle galeria ha fallado')
        }

    }
    devolverURLImagenUser = async (nombreFoto) => {
    
        const storageRef = ref(storage, `users/${nombreFoto}`);
        try {
            getDownloadURL(storageRef)
                .then((URLImagen) => {

                   
                    this.setState({ ImagenUser: URLImagen })
                    
                })
                .catch((error) => {
                 

                    console.error('Error al obtener la URL de descarga:', error);
                });
        } catch (error) {
            console.log('Error al obtener la URL de descarga 2:', error);
        }
    }

  
    render() {
        
        if (this.state.user) {
            
            this.devolverURLImagenUser(this.state.user.uid)
            
            return (
                <View >
                    <Card>
                        
                        <Card.Title>Bienvenido {this.state.user.email} !</Card.Title>
                        <Card.Divider />

                        <View style={styles.vistaCard}>
                            <Text style={{paddingBottom: '5%'}}>Nombre de usuario: {this.state.user.email} </Text>
                            <Card.Image style={styles.imagenUser}
                                source={{ uri: this.state.ImagenUser }}></Card.Image>
                                <View style={{paddingTop: '10%', flexDirection:'row'}}>
                                    <Pressable 
                                        style={styles.botonAnadirImagen}
                                        onPress={() => this.handleGaleria()}>
                                        <Text>Añadir imagen de perfil</Text>
                                    </Pressable>
                                   
                                     <Button 
                                    onPress={() => auth.signOut().then(() => {
                                        console.log("SignOut OK");
                                    }).catch((error) => {
                                        console.log("SignOut ERROR");
                                    })}
                                    title="Salir"
                                    color="#f70000" /> 
                                </View>
                            
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
        alignContent: 'center',
        alignItems:'center',
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
        width: 200,
        height: 200,
        paddingBottom: '10%',
    }, 
    logout: {
        backgroundColor: 'red'
    },

})

export default Login;