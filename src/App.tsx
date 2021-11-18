import React, { useEffect, useState } from 'react'
import {
  View,
  Modal,
  Text,
  TouchableOpacity
} from 'react-native'
import MapView, {
  Marker,
  PROVIDER_GOOGLE
} from 'react-native-maps'

import styles from './styles'

import mapStyle from 'assets/mapstyle.json'
import useCountryCovid from 'hooks/useCountryCovid'
import useWeather from 'hooks/useWeather'
import { CityProps, PositionProps } from 'services/types'

import chuva from './assets/weather/chuva_marker.png'
import nublado from './assets/weather/nublado_marker.png'
import sol from './assets/weather/sol_marker.png'

const initialLocation = {
  latitude: -23.555466247781098,
  longitude: -46.638762042336595
}

const climaSecoText = `- Baixa umidade do ar
- Altas temperaturas
- Facilidade ressecamento vias respiratórias
- Favorece surgimento de problemas respiratórios
- Aumento dos vetores transportadores de doenças

Além do ar poluído e com a queda da umidade em períodos mais secos, as vias aéreas ficam ressecadas com maior facilidade, o que intensifica e favorece o surgimento de problemas respiratórios o que pode agravar ainda mais os casos de COVID-19.

+ Taxa de propagação: Alta;
+ Dicas de prevenção: Evitar horários ao ar livre; Beber muita água;`

const climaChuvosoText = `- Umidade do ar ajuda ajuda a reduzir a transmissão de doenças
- Tendência à algomeraões em locais fechados

Evite ficar em locais fechados sem circulação de ar em períodos chuvosos, nunca feche totalmente as janelas de transportes públicos nesses períodos, sempre que possível, as janelas devem ser abertas, a preocupação é que o distanciamento entre as pessoas seja reduzido em períodos chuvosos, causando um maior número de infectados.

+ Taxa de propagação: Baixa;
+ Dicas de prevenção: Evitar ambientes fechados;`

const climaFrioText = `- Luz solar menos abundante, preservando vírus nas superfícies;
- Pessoas tendem a se aglomerar mais em ambientes fechados;

Estudos mostraram que o ar frio e seco do inverno pode ajudar o vírus a permanecer intacto no ar e se espalhar por longas distâncias.

+ Taxa de propagação: Média;
+ Dicas de prevenção: Evitar ambientes fechados; Beber muita água;`

const getIconByCode = (code: number) => {
  switch (code) {
    case 1000:
      return sol
    case 1003:
    case 1006:
    case 1009:
    case 1030:
      return nublado
    case 1063:
    case 1066:
    case 1069:
    case 1072:
    case 1150:
    case 1153:
    case 1168:
    case 1171:
    case 1180:
    case 1183:
    case 1186:
    case 1189:
    case 1192:
    case 1195:
    case 1198:
    case 1201:
    case 1240:
    case 1243:
    case 1246:
      return chuva
    default:
      return sol
  }
}

const getTextByCode = (code: number): string => {
  switch (code) {
    case 1000:
      return climaSecoText
    case 1003:
    case 1006:
    case 1009:
    case 1030:
      return climaFrioText
    case 1063:
    case 1066:
    case 1069:
    case 1072:
    case 1150:
    case 1153:
    case 1168:
    case 1171:
    case 1180:
    case 1183:
    case 1186:
    case 1189:
    case 1192:
    case 1195:
    case 1198:
    case 1201:
    case 1240:
    case 1243:
    case 1246:
      return climaChuvosoText
    default:
      return climaChuvosoText
  }
}

const App = () => {
  const [cityModal, setCityModal] = useState<CityProps | null>(null)
  const [showCovidData, setShowCovidData] = useState(false)
  const [region, setRegion] = useState<PositionProps>(initialLocation)
  const { data } = useWeather(region)
  const { data: countryCovidData, revalidate } = useCountryCovid()

  useEffect(() => {
    revalidate()
  }, [])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapa}
        loadingEnabled
        provider={PROVIDER_GOOGLE}
        zoomControlEnabled
        showsUserLocation
        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5
        }}
        customMapStyle={mapStyle}
        showsMyLocationButton
        onRegionChangeComplete={r => setRegion({ latitude: r.latitude, longitude: r.longitude })}
      >
        {data.map(city => (
          <Marker
            key={city.id}
            coordinate={{
              latitude: city.latitude,
              longitude: city.longitude
            }}
            // title={city.name}
            // description={city.weatherTitle}
            icon={getIconByCode(Number(city.weatherCode))}
            onPress={() => setCityModal(city)}
          />
        ))}
      </MapView>

      <View style={styles.covidContainer}>
        <TouchableOpacity
          style={styles.covidHeader}
          onPress={() => setShowCovidData(!showCovidData)}
        >
          <View style={styles.covidBar} />
          <Text style={styles.covidTitle}>COVID-19 no Brasil</Text>

          {!!countryCovidData && showCovidData && (
            <View style={styles.covidCounts}>
              <View style={[styles.covidCountCard, styles.covidCountCardConfirmed]}>
                <Text style={styles.covidCountCardLabel}>Confirmados</Text>
                <Text style={styles.covidCountCardValue}>{countryCovidData.confirmed}</Text>
              </View>

              <View style={[styles.covidCountCard, styles.covidCountCardCritical]}>
                <Text style={styles.covidCountCardLabel}>Criticos</Text>
                <Text style={styles.covidCountCardValue}>{countryCovidData.critical}</Text>
              </View>

              <View style={[styles.covidCountCard, styles.covidCountCardDeath]}>
                <Text style={styles.covidCountCardLabel}>Mortos</Text>
                <Text style={styles.covidCountCardValue}>{countryCovidData.deaths}</Text>
              </View>

              <View style={[styles.covidCountCard, styles.covidCountCardRecovered]}>
                <Text style={styles.covidCountCardLabel}>Recuperados</Text>
                <Text style={styles.covidCountCardValue}>{countryCovidData.recovered}</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Modal
        visible={!!cityModal}
        transparent
        onRequestClose={() => setCityModal(null)}
      >
        <TouchableOpacity style={styles.modalContainer} onPress={() => setCityModal(null)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalCity}>{cityModal?.name}</Text>
            <Text style={styles.modalTitle}>{cityModal?.weatherTitle}</Text>
            <Text style={styles.modalText}>{getTextByCode(Number(cityModal?.weatherCode))}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

export default App
