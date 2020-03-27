import React, { useEffect, useState }from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import api from '../../service/api'
import style from './style'
import logoImg from '../../assets/logo.png';

const Incidents = () => {
    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal]= useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigationToDetail = (incident) => {
        navigation.navigate("Detail", { incident })
    }
const loadIncidents = async () => {
    if(loading) {
        return
    }
    if(total > 0 && incidents.length === total){
        return
    }
    setLoading(true);
    const response = await api.get("incedents", {
        params: { page }
    });
    
    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
}
    useEffect(() => {
        loadIncidents()
    }, [])
    return (
        <View style={style.container}> 
            <View style={style.header}>
                <Image source={logoImg} />
                <Text style={style.headerText}>
    Total de <Text style={style.headerTextBold}>{total} casos</Text>
                </Text>
            </View>
            <Text style={style.title}>Bem vindo</Text>
            <Text style={style.description}>Escolha um dos casos e salve o dia</Text>

            <FlatList 
            data={incidents}
            style={style.incidentesList}
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.2}
            renderItem={({ item: incident }) => (
                <View style={style.incident}>
                <Text style={style.incidentProperty}>ONG:</Text>
                <Text style={style.incidentValue}>{incident.name}</Text>

                <Text style={style.incidentProperty}>CASO:</Text>
            <Text style={style.incidentValue}>{incident.title}</Text>

                <Text style={style.incidentProperty}>VALUE:</Text>
            <Text style={style.incidentValue}>
                {Intl.NumberFormat("pt-br", {
                    style: "currency", 
                    currency: "BRL"})
                    .format(incident.value)}
                </Text>

                <TouchableOpacity 
                style={style.detailButton}
                 onPress={() => navigationToDetail(incident)}
                >
                    <Text style={style.detailButtonText}>More</Text>
                    <Feather name="arrow-right" size={16} color="#e02041" />
                </TouchableOpacity>

            </View>
            )} />
            </View>
    );
}

export default Incidents;