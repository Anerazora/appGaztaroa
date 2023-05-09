import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Modal, Button } from 'react-native';
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
    postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario))
})

function RenderExcursion(props) {

    const excursion = props.excursion;

    if (excursion != null) {

        return (
            <Card>
                <Card.Divider />
                <Card.Image source={{ uri: baseUrl + excursion.imagen }}>
                    <Card.Title style={styles.cardTitleStyle}>{excursion.nombre}</Card.Title>
                </Card.Image>
                <Text style={{ margin: 20 }}>
                    {excursion.descripcion}
                </Text>
                <View style={styles.formRow}>
                    <Icon
                        raised
                        reverse
                        name={props.favorita ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                    />

                    <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color={colorGaztaroaOscuro}
                        onPress={() => props.onPressComentario()}
                    />
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
                <Text style={{ fontSize: 14 }}>{item.valoracion} Valoracion</Text>
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
            showModal: false
        }
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
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
        console.log(this.state);
        this.props.postComentario(excursionId, this.state.valoracion, this.state.autor, this.state.comentario);
        this.resetForm();
    }

    marcarFavorito(excursionId) {
        this.props.postFavorito(excursionId);
    }

    render() {
        const { excursionId } = this.props.route.params;

        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                    onPressComentario={() => this.toggleModal()}
                />
                <RenderComentario
                    comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                />

                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => { this.toggleModal(); this.resetForm(); }}
                    onRequestClose={() => { this.toggleModal(); this.resetForm(); }}>
                    <View style={styles.modal}>

                        <Rating
                            showRating
                            onFinishRating={value => this.setState({ puntuacion: value })}
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
                        <Button style={styles.formRow}
                            onPress={() => { this.gestionarComentario(excursionId) }}
                            title="ENVIAR"
                            color={colorGaztaroaOscuro}
                            accessibilityLabel=""
                        />
                        <Button style={styles.formRow}
                            onPress={() => { this.toggleModal(); this.resetForm(); }}
                            color={colorGaztaroaOscuro}
                            title="CANCELAR"
                        />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);