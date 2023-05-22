import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Modal, Button, Pressable } from 'react-native';
import { Card, Icon, Input } from '@rneui/themed';
import { Rating } from 'react-native-ratings';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';
import { colorGaztaroaOscuro, colorGaztaroaClaro } from '../comun/comun';

const mapStateToProps = state => {
    return {
        actividades: state.actividades,
        excursiones: state.excursiones,
        cabeceras: state.cabeceras,
        comentarios: state.comentarios,
        favoritos: state.favoritos
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (comentario) => dispatch(postComentario(comentario))
})

function RenderExcursion(props) {

    const excursion = props.excursion;

    if (excursion != null) {

        return (
            <Card>
                <Card.Divider />
                <Card.Image source={{ uri:  excursion.imagen }}>
                    <Card.Title style={styles.cardTitleStyle}>{excursion.nombre}</Card.Title>
                </Card.Image>
                <Text style={{ margin: 20 }}>
                    {excursion.descripcion}
                </Text>
                <View style={styles.icon}>
                    <Icon
                        //raised
                        reverse
                        name={props.favorita ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                    />

                    <Icon
                        //raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color={colorGaztaroaOscuro}
                        onPress={() => props.onPressComentario()}
                    />
                    <Pressable style={styles.botonApuntate}
                     onPress={() => props.onPressApuntate()}
                    >
                        <Text>Apúntate a la excursión!</Text>
                    </Pressable>
                </View>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

function RenderComentario(props) {

    const comentarios = props.comentarios;

    const renderCommentarioItem = ({ item, index }) => {

        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comentario}</Text>
                <Text style={{ fontSize: 14 }}>{item.valoracion} Estrellas</Text>
                <Text style={{ fontSize: 14 }}>{'-- ' + item.autor + ', ' + item.dia} </Text>
            </View>
        );
    };

    return (
        <Card>
            <Card.Title>Comentarios</Card.Title>
            <Card.Divider />
            <FlatList scrollEnabled={false}
                data={comentarios}
                renderItem={renderCommentarioItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}


class DetalleExcursion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valoracion: 3,
            autor: '',
            comentario: '',
            showModal: false,
            showModal2: false,
        }
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }
    toggleModal2(){
        this.setState({ showModal2: !this.state.showModal2 });
    }
    resetModal2(){
        this.setState({
            showModal2: false,
        })
    }
    resetForm() {
        this.setState({
            valoracion: 3,
            autor: '',
            comentario: '',
            dia: '',
            showModal: false
        });
    }

    gestionarComentario(excursionId) {
        this.props.postComentario({
            excursionId : excursionId,
            valoracion: this.state.valoracion,
            autor: this.state.autor,
            comentario: this.state.comentario,
            dia : (new Date()).toISOString()
        });
        // console.log(this.state);
        // console.log(excursionId)
        // this.props.postComentario(excursionId, this.state.valoracion, this.state.autor, this.state.comentario);
        this.resetForm();
    }

    marcarFavorito(excursionId) {
        this.props.postFavorito(excursionId);
    }

    render() {
        const { excursionId } = this.props.route.params;
        const comentarios = Object.keys(this.props.comentarios.comentarios)
        .map(key => this.props.comentarios.comentarios[key])
        .filter(comment => comment.excursionId == excursionId)
        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                    onPressComentario={() => this.toggleModal()}
                    onPressApuntate = { () => this.toggleModal2()}
                />
                <RenderComentario
                    comentarios={comentarios}
                />

                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => { this.toggleModal(); this.resetForm(); }}
                    onRequestClose={() => { this.toggleModal(); this.resetForm(); }}>
                    <View style={styles.vista}>

                        <Rating
                            showRating
                            type = 'star'
                            ratingColor='#3498db'
                            ratingBackgroundColor='#c8c7c8'
                            ratingCount={5}
                            imageSize={30}
                            jumpValue={1}
                            onFinishRating={value => this.setState({ valoracion: value })}
                            style={{ paddingVertical: 40 }}
                            defaultRating={3}
                        />
                        <Input
                            placeholder=' Autor'
                            onChangeText={value => this.setState({ autor: value })}
                            leftIcon={
                                <Icon
                                    name='user-o'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                />
                            }
                        />
                        <Input
                            placeholder=' Comentario'
                            onChangeText={value => this.setState({ comentario: value })}
                            leftIcon={
                                <Icon
                                    name='comment-o'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                />
                            }
                        />
                        <Button style={styles.botonModal}
                            onPress={() => { this.gestionarComentario(excursionId) }}
                            title="ENVIAR"
                            color={colorGaztaroaOscuro}
                            accessibilityLabel=""
                        />
                        <Button style={styles.botonModal}
                            onPress={() => { this.toggleModal(); this.resetForm(); }}
                            color={colorGaztaroaOscuro}
                            title="CANCELAR"
                        />
                    </View>
                </Modal>
                <Modal
                 visible={this.state.showModal2}
                 transparent={false}
                 //onDismiss={() => { this.toggleModal2() }}
                 //onRequestClose={() => { this.toggleModal2() }}
                >
                    <View style= {styles.vista}>
                        <Text style={styles.textoModal2}>¿Seguro que quiere apuntarse a la excursión?</Text>
                        <Pressable style={styles.botonAceptar}
                            onPress={() => { this.toggleModal2(); this.resetModal2()}}
                        >
                            <Text style= {styles.textoBotonModal}>ACEPTAR</Text>
                        </Pressable>

                        <Pressable style= {styles.botonCancelar}
                         onPress={() => { this.toggleModal2(); this.resetModal2()}}
                        >
                            <Text style= {styles.textoBotonModal}>CANCELAR</Text>
                        </Pressable>

                        <Pressable style= {styles.botonModal}
                         onPress={() => { this.toggleModal2(); this.resetModal2()}}
                        >
                            <Text style= {styles.textoBotonModal}>ACEPTAR Y AÑADIR AL CALENDARIO</Text>
                        </Pressable>
                    </View>
                </Modal>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    cardTitleStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    botonModal: {
        alignSelf: 'center',
        backgroundColor: '#272727',
        padding: '2%',
        marginBottom: '5%',
        borderRadius: '20%',
        maxWidth: '45%',
    },
    vista: {
        paddingTop: 100,
        paddingLeft: 30, 
        paddingRight: 30,
    }, 
    icon: {
        flexDirection: 'row', 
        alingItems: 'center', 
        justifyContent: 'center'
    },
    vistaApuntate: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20%',
    },
    textoBotonModal: {
        textAlign: 'center',
        color: 'white'
    },
    textoModal2: {
        textAlign: 'center',
        fontSize: 20,
        paddingBottom: '5%',
        paddingTop: '40%'

    },
    botonApuntate: {
        backgroundColor: '#b2dafa',
        alignSelf: 'center',
        padding: '4%',
        marginBottom: '5%',
        borderRadius: '20%',
        maxWidth: '45%',
    },
    botonAceptar: {
        backgroundColor: '#4caf50',
        alignSelf: 'center',
        padding: '2%',
        marginBottom: '5%',
        borderRadius: '20%',
        maxWidth: '45%',
    },
    botonCancelar:{
        backgroundColor: '#dc143c',
        alignSelf: 'center',
        padding: '2%',
        marginBottom: '5%',
        borderRadius: '20%',
        maxWidth: '45%',
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);