import React, { Component } from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import { Card } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

const mapStateToProps = state => {
    return {
        actividades: state.actividades,
        excursiones: state.excursiones,
        cabeceras: state.cabeceras
    }
}

function RenderItem(props) {

    const item = props.item;

    if (props.isLoading) {
        return (
            <IndicadorActividad />
        );
    }

    else if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }

    else {

        if (item != null) {
            return (
                <Card>
                    <Card.Divider />
                    <Card.Image source={{ uri: baseUrl + item.imagen }}>
                        <Card.Title style={inLine.cardTitleStyle}>{item.nombre}</Card.Title>
                    </Card.Image>
                    <Text style={{ margin: 20 }}>
                        {item.descripcion}
                    </Text>
                </Card>
            );
        }
        else {
            return (<View></View>);
        }
    }
}

class Home extends Component {

    render() {

        return (
            <ScrollView>
                <RenderItem item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]}
                    isLoading={this.props.excursiones.isLoading}
                    errMess={this.props.excursiones.errMess}
                />
                <RenderItem item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        );
    }
}

const inLine = StyleSheet.create({
    cardTitleStyle: {
        color: 'chocolate',
        fontWeight: 'bold',
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
});

export default connect(mapStateToProps)(Home);