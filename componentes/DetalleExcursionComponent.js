import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';

function RenderExcursion(props) {

    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card>
                <Card.Divider />
                <Card.Image source={require('./imagenes/40Años.png')}>
                    <Card.Title style={inLine.cardTitleStyle}>{excursion.nombre}</Card.Title>
                </Card.Image>
                <Text style={{ margin: 20 }}>
                    {excursion.descripcion}
                </Text>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

class DetalleExcursion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES
        };
    }

    render() {
        const { excursionId } = this.props.route.params;
        return (<RenderExcursion excursion={this.state.excursiones[+excursionId]} />);
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

export default DetalleExcursion;
