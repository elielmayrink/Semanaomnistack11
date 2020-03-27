import React from 'react';
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import * as MailComposer from 'expo-mail-composer'
import logoImg from '../../assets/logo.png';
import style from './style'

const Detail = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;


    const mensagem = `ola ${incident.name} gostaria de saber mais detalhes sobre o caso: ${incident.title}`
    const navigationIncident = () => {
        navigation.goBack()
    }
    const sendMail = () => {
        MailComposer.composeAsync({
            subject: "You are a hero",
            recipients: [incident.email],
            body: mensagem
        })
    }

    const sendWhats =() => {
        Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${mensagem}`)
    }
    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigationIncident}>
                    <Feather 
                    name="arrow-left" 
                    size={28} color="#e02041" />
                </TouchableOpacity>
            </View>

            <View style={style.incident}>
            <Text style={[style.incidentProperty, {marginTop: 0}]}>ONG:</Text>
    <Text style={style.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={style.incidentProperty}>CASO:</Text>
                <Text style={style.incidentValue}>{incident.title}</Text>

                <Text style={style.incidentProperty}>DESCRIPTION:</Text>
                <Text style={style.incidentValue}>{incident.description}</Text>


                <Text style={style.incidentProperty}>VALUE:</Text>
                <Text style={style.incidentValue}>
                    {Intl.NumberFormat("pt-br", {
                    style: "currency", 
                    currency: "BRL"})
                    .format(incident.value)}</Text>
            </View>
                <View style={style.contactBox}>
                    <Text style={style.heroTitle}>Salve o dia!</Text>
                    <Text style={style.heroTitle}>Seja o heroi desse caso.</Text>
                    <Text style={style.heroContactt}>Entre em contato</Text>

                    <View style={style.actions}>
                        <TouchableOpacity style={style.buttonAction} onPress={sendWhats}>
                            <Text style={style.btnText}>Whatsapp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.buttonAction} onPress={sendMail}>
                            <Text style={style.btnText}>Email</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            

        </View>
    );
}

export default Detail;