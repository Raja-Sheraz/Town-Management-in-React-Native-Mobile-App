import React from 'react'
import { Text, View } from 'react-native'
import styles from '../assets/css/style'

function Test() {
    return (
        <>
            <View style={[]}>
                <Text style={[styles.text_dark, { fontSize: 30 }]}>Test</Text>
            </View>

        </>
    )
}

export default Test