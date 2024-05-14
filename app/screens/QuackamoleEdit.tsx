import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { stylesEdit } from './stylesEdit';
import BackIcon from '../../assets/back-icon.svg';

const QuackamoleEdit = ({ navigation }) => {
    const hiraganaCharacters = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん'];
    const katakanaCharacters = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン'];
    const hiraganaDakutenCharacters = ['が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 'だ', 'ぢ', 'づ', 'で', 'ど', 'ば', 'び', 'ぶ', 'べ', 'ぼ'];
    const katakanaDakutenCharacters = ['ガ', 'ギ', 'グ', 'ゲ', 'ゴ', 'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド', 'バ', 'ビ', 'ブ', 'ベ', 'ボ'];
    const hiraganaHandakutenCharacters = ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'];
    const katakanaHandakutenCharacters = ['パ', 'ピ', 'プ', 'ペ', 'ポ'];

    const [selectedSet, setSelectedSet] = useState('Hiragana');
    const [selectedCharacters, setSelectedCharacters] = useState([]);

    const handleSetChange = (value) => {
        setSelectedSet(value);
        setSelectedCharacters([]);
    }

    const handleCharacterPress = (character) => {
        if (selectedCharacters.includes(character)) {
            setSelectedCharacters(selectedCharacters.filter(char => char !== character));
        } else {
            setSelectedCharacters([...selectedCharacters, character]);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            setSelectedCharacters([]);
            navigation.navigate('QuackamoleLevels');
        });

        return unsubscribe;
    }, [navigation]);

    const renderCharacters = () => {
        let characters = [];
        switch (selectedSet) {
            case 'Hiragana':
                characters = hiraganaCharacters.concat(hiraganaDakutenCharacters, hiraganaHandakutenCharacters);
                break;
            case 'Katakana':
                characters = katakanaCharacters.concat(katakanaDakutenCharacters, katakanaHandakutenCharacters);
                break;
            default:
                break;
        }
        return characters.map((character, index) => (
            <TouchableOpacity
                key={index}
                onPress={() => handleCharacterPress(character)}
                style={[
                    stylesEdit.characterButton,
                    selectedCharacters.includes(character) && stylesEdit.selectedCharacter
                ]}
            >
                <Text style={stylesEdit.characterText}>{character}</Text>
            </TouchableOpacity>
        ));
    }
    

    return (
        <View style={{ flex: 1 }}>
            <View style={stylesEdit.header}>
                <TouchableOpacity onPress={() => navigation.navigate('ClassDashboard')}>
                    <View style={stylesEdit.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={stylesEdit.titleTextContainer}>
                <Text style={stylesEdit.titleText}>Classname: </Text>
            </View>
            <View style={stylesEdit.buttonContainer}>
                <Picker
                    selectedValue={selectedSet}
                    style={[stylesEdit.picker, { backgroundColor: '#8ED94D' }]}
                    onValueChange={(itemValue, itemIndex) => handleSetChange(itemValue)}
                >
                    <Picker.Item label="Hiragana" value="Hiragana" />
                    <Picker.Item label="Katakana" value="Katakana" />
                </Picker>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={stylesEdit.charContainer}>
                    {renderCharacters()}
                </View>
            </ScrollView>
        </View>
    );
}

export default QuackamoleEdit;
