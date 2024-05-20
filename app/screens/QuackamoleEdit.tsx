import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Button, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { stylesEdit } from './stylesEdit';
import BackIcon from '../../assets/back-icon.svg';
import expoconfig from '../../expoconfig';

const QuackamoleEdit = ({ navigation, route }) => {
    const { classCode, levelId } = route.params;

    const screenWidth = Dimensions.get('window').width;
    const buttonWidth = (screenWidth - (10 * 6)) / 5;

    const hiraganaCharacters = [
        { kana: 'あ', romaji: 'a' }, { kana: 'い', romaji: 'i' }, { kana: 'う', romaji: 'u' },
        { kana: 'え', romaji: 'e' }, { kana: 'お', romaji: 'o' }, { kana: 'か', romaji: 'ka' },
        { kana: 'き', romaji: 'ki' }, { kana: 'く', romaji: 'ku' }, { kana: 'け', romaji: 'ke' },
        { kana: 'こ', romaji: 'ko' }, { kana: 'さ', romaji: 'sa' }, { kana: 'し', romaji: 'shi' },
        { kana: 'す', romaji: 'su' }, { kana: 'せ', romaji: 'se' }, { kana: 'そ', romaji: 'so' },
        { kana: 'た', romaji: 'ta' }, { kana: 'ち', romaji: 'chi' }, { kana: 'つ', romaji: 'tsu' },
        { kana: 'て', romaji: 'te' }, { kana: 'と', romaji: 'to' }, { kana: 'な', romaji: 'na' },
        { kana: 'に', romaji: 'ni' }, { kana: 'ぬ', romaji: 'nu' }, { kana: 'ね', romaji: 'ne' },
        { kana: 'の', romaji: 'no' }, { kana: 'は', romaji: 'ha' }, { kana: 'ひ', romaji: 'hi' },
        { kana: 'ふ', romaji: 'fu' }, { kana: 'へ', romaji: 'he' }, { kana: 'ほ', romaji: 'ho' },
        { kana: 'ま', romaji: 'ma' }, { kana: 'み', romaji: 'mi' }, { kana: 'む', romaji: 'mu' },
        { kana: 'め', romaji: 'me' }, { kana: 'も', romaji: 'mo' }, { kana: 'や', romaji: 'ya' },
        { kana: 'ゆ', romaji: 'yu' }, { kana: 'よ', romaji: 'yo' }, { kana: 'ら', romaji: 'ra' },
        { kana: 'り', romaji: 'ri' }, { kana: 'る', romaji: 'ru' }, { kana: 'れ', romaji: 're' },
        { kana: 'ろ', romaji: 'ro' }, { kana: 'わ', romaji: 'wa' }, { kana: 'を', romaji: 'wo' },
        { kana: 'ん', romaji: 'n' }
    ];

    const hiraganaDakutenCharacters = [
        { kana: 'が', romaji: 'ga' }, { kana: 'ぎ', romaji: 'gi' }, { kana: 'ぐ', romaji: 'gu' },
        { kana: 'げ', romaji: 'ge' }, { kana: 'ご', romaji: 'go' }, { kana: 'ざ', romaji: 'za' },
        { kana: 'じ', romaji: 'ji' }, { kana: 'ず', romaji: 'zu' }, { kana: 'ぜ', romaji: 'ze' },
        { kana: 'ぞ', romaji: 'zo' }, { kana: 'だ', romaji: 'da' }, { kana: 'ぢ', romaji: 'ji' },
        { kana: 'づ', romaji: 'zu' }, { kana: 'で', romaji: 'de' }, { kana: 'ど', romaji: 'do' },
        { kana: 'ば', romaji: 'ba' }, { kana: 'び', romaji: 'bi' }, { kana: 'ぶ', romaji: 'bu' },
        { kana: 'べ', romaji: 'be' }, { kana: 'ぼ', romaji: 'bo' }
    ];

    const hiraganaHandakutenCharacters = [
        { kana: 'ぱ', romaji: 'pa' }, { kana: 'ぴ', romaji: 'pi' }, { kana: 'ぷ', romaji: 'pu' },
        { kana: 'ぺ', romaji: 'pe' }, { kana: 'ぽ', romaji: 'po' }
    ];

    const katakanaCharacters = [
        { kana: 'ア', romaji: 'a' }, { kana: 'イ', romaji: 'i' }, { kana: 'ウ', romaji: 'u' },
        { kana: 'エ', romaji: 'e' }, { kana: 'オ', romaji: 'o' }, { kana: 'カ', romaji: 'ka' },
        { kana: 'キ', romaji: 'ki' }, { kana: 'ク', romaji: 'ku' }, { kana: 'ケ', romaji: 'ke' },
        { kana: 'コ', romaji: 'ko' }, { kana: 'サ', romaji: 'sa' }, { kana: 'シ', romaji: 'shi' },
        { kana: 'ス', romaji: 'su' }, { kana: 'セ', romaji: 'se' }, { kana: 'ソ', romaji: 'so' },
        { kana: 'タ', romaji: 'ta' }, { kana: 'チ', romaji: 'chi' }, { kana: 'ツ', romaji: 'tsu' },
        { kana: 'テ', romaji: 'te' }, { kana: 'ト', romaji: 'to' }, { kana: 'ナ', romaji: 'na' },
        { kana: 'ニ', romaji: 'ni' }, { kana: 'ヌ', romaji: 'nu' }, { kana: 'ネ', romaji: 'ne' },
        { kana: 'ノ', romaji: 'no' }, { kana: 'ハ', romaji: 'ha' }, { kana: 'ヒ', romaji: 'hi' },
        { kana: 'フ', romaji: 'fu' }, { kana: 'ヘ', romaji: 'he' }, { kana: 'ホ', romaji: 'ho' },
        { kana: 'マ', romaji: 'ma' }, { kana: 'ミ', romaji: 'mi' }, { kana: 'ム', romaji: 'mu' },
        { kana: 'メ', romaji: 'me' }, { kana: 'モ', romaji: 'mo' }, { kana: 'ヤ', romaji: 'ya' },
        { kana: 'ユ', romaji: 'yu' }, { kana: 'ヨ', romaji: 'yo' }, { kana: 'ラ', romaji: 'ra' },
        { kana: 'リ', romaji: 'ri' }, { kana: 'ル', romaji: 'ru' }, { kana: 'レ', romaji: 're' },
        { kana: 'ロ', romaji: 'ro' }, { kana: 'ワ', romaji: 'wa' }, { kana: 'ヲ', romaji: 'wo' },
        { kana: 'ン', romaji: 'n' }
    ];

    const katakanaDakutenCharacters = [
        { kana: 'ガ', romaji: 'ga' }, { kana: 'ギ', romaji: 'gi' }, { kana: 'グ', romaji: 'gu' },
        { kana: 'ゲ', romaji: 'ge' }, { kana: 'ゴ', romaji: 'go' }, { kana: 'ザ', romaji: 'za' },
        { kana: 'ジ', romaji: 'ji' }, { kana: 'ズ', romaji: 'zu' }, { kana: 'ゼ', romaji: 'ze' },
        { kana: 'ゾ', romaji: 'zo' }, { kana: 'ダ', romaji: 'da' }, { kana: 'ヂ', romaji: 'ji' },
        { kana: 'ヅ', romaji: 'zu' }, { kana: 'デ', romaji: 'de' }, { kana: 'ド', romaji: 'do' },
        { kana: 'バ', romaji: 'ba' }, { kana: 'ビ', romaji: 'bi' }, { kana: 'ブ', romaji: 'bu' },
        { kana: 'ベ', romaji: 'be' }, { kana: 'ボ', romaji: 'bo' }
    ];

    const katakanaHandakutenCharacters = [
        { kana: 'パ', romaji: 'pa' }, { kana: 'ピ', romaji: 'pi' }, { kana: 'プ', romaji: 'pu' },
        { kana: 'ペ', romaji: 'pe' }, { kana: 'ポ', romaji: 'po' }
    ];

    const [selectedSet, setSelectedSet] = useState('Hiragana');
    const [kana, setKana] = useState([]);
    const [romaji, setRomaji] = useState([]);

    useEffect(() => {
        fetchContent();
    }, [levelId]);

    const fetchContent = async () => {
        const url = `${expoconfig.API_URL}/api/quackamolecontent/getContent/${levelId}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (response.ok && data.kana && data.kana.length > 0) {
                setKana(data.kana);
                setRomaji(data.romaji);
            } else {
                console.log('No content found for this level');
                setKana([]);
                setRomaji([]);
            }
        } catch (error) {
            console.error('Error fetching content:', error);
            setKana([]);
            setRomaji([]);
        }
    }

    const addCharacter = async (character) => {
        const url = `${expoconfig.API_URL}/api/quackamolecontent/addCharacter`;
        const contentData = {
            levelId,
            kana: character.kana,
            romaji: character.romaji
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contentData)
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Character added successfully:', data);
            } else {
                throw new Error(`Failed to add character: ${data.message} (Status code: ${response.status})`);
            }
        } catch (error) {
            console.error('Error adding character:', error);
        }
    }

    const removeCharacter = async (character) => {
        const url = `${expoconfig.API_URL}/api/quackamolecontent/removeCharacter`;
        const contentData = {
            levelId,
            kana: character.kana,
            romaji: character.romaji
        };

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contentData)
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Character removed successfully:', data);
            } else {
                throw new Error(`Failed to remove character: ${data.message} (Status code: ${response.status})`);
            }
        } catch (error) {
            console.error('Error removing character:', error);
        }
    }

    const handleSetChange = (value) => {
        setSelectedSet(value);
        setKana([]);
        setRomaji([]);
    }

    const handleCharacterPress = (character) => {
        if (kana.includes(character.kana)) {
            setKana(kana.filter(char => char !== character.kana));
            setRomaji(romaji.filter(rom => rom !== character.romaji));
            removeCharacter(character);  // Remove the character from backend
        } else {
            setKana([...kana, character.kana]);
            setRomaji([...romaji, character.romaji]);
            addCharacter(character);  // Add the character to backend
        }
    }

    const renderCharacters = () => {
        let characters = [];
        switch (selectedSet) {
            case 'Hiragana':
                characters = hiraganaCharacters;
                break;
            case 'Hiragana Dakuten':
                characters = hiraganaDakutenCharacters;
                break;
            case 'Hiragana Handakuten':
                characters = hiraganaHandakutenCharacters;
                break;
            case 'Katakana':
                characters = katakanaCharacters;
                break;
            case 'Katakana Dakuten':
                characters = katakanaDakutenCharacters;
                break;
            case 'Katakana Handakuten':
                characters = katakanaHandakutenCharacters;
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
                    kana && kana.includes(character.kana) && stylesEdit.selectedCharacter,
                    { width: buttonWidth, height: buttonWidth, justifyContent: 'center', alignItems: 'center' } // Use the calculated width and height
                ]}
            >
                <Text style={stylesEdit.characterText}>{character.kana}</Text>
            </TouchableOpacity>
        ));
    }

    const handleBackPress = () => {
        navigation.navigate('QuackamoleLevels', { classCode, levelId });
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={stylesEdit.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <View style={stylesEdit.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={stylesEdit.titleTextContainer}>
                <Text style={stylesEdit.titleText}>Classname: Quackamole</Text>
            </View>
            <View style={stylesEdit.buttonContainer}>
                <Picker
                    selectedValue={selectedSet}
                    style={[stylesEdit.picker, { backgroundColor: '#8ED94D' }]}
                    onValueChange={(itemValue, itemIndex) => handleSetChange(itemValue)}
                >
                    <Picker.Item label="Hiragana" value="Hiragana" />
                    <Picker.Item label="Hiragana Dakuten" value="Hiragana Dakuten" />
                    <Picker.Item label="Hiragana Handakuten" value="Hiragana Handakuten" />
                    <Picker.Item label="Katakana" value="Katakana" />
                    <Picker.Item label="Katakana Dakuten" value="Katakana Dakuten" />
                    <Picker.Item label="Katakana Handakuten" value="Katakana Handakuten" />
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
