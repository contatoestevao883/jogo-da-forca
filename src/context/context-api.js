import { createContext, useState } from "react"
import palavras from "../palavras"
import alfabeto from "../alfabeto"

export const AuthContext = createContext()

export default function ContextProvider({ children }) {

    const [errors, setErrors] = useState(0)
    const [chosenWord, setChosenWord] = useState([])
    const [word, setWord] = useState([])
    const [usedWord, setUsedWords] = useState(alfabeto)
    const [wordColor, setWordColor] = useState("black")

    function sortWord() {
        const i = Math.floor(Math.random() * palavras.length)
        const word = palavras[i]

        const arrayOfWords = word.split("")
        setChosenWord(arrayOfWords)

        let underline = []
        arrayOfWords.forEach(() => underline.push(" _"))
        setWord(underline)
    }

    function gameFinish() {
        setWord(chosenWord)
        setUsedWords(alfabeto)
    }
    function clickedLetter(word) {
        setUsedWords([...usedWord, word])

        if (chosenWord.includes(word)) {
            rightWord(word)
        } else {
            wrongWord()
        }
    }

    function rightWord(inputWord) {
        const newWord = [...word]

        chosenWord.forEach((word, i) => {
            if (word === inputWord) {
                newWord[i] = inputWord
            }
        })
        setWord(newWord)

        if (!newWord.includes(" _")) {
            setWordColor("green")
            gameFinish()
        }
    }


    function wrongWord() {
        const newErrors = errors + 1
        setErrors(newErrors)

        if (newErrors === 6) {
            setWordColor("red")
            gameFinish()
        }
    }


    function gameStart() {
        setErrors(0)
        setUsedWords([])
        setWordColor("preto")
        sortWord()
    }

    return (
        <AuthContext.Provider value={{
            errors, chosenWord, word, usedWord, wordColor,
            setErrors, setChosenWord, setWord, setUsedWords, setWordColor,
            sortWord, gameFinish, rightWord, clickedLetter, gameStart, wrongWord
        }}>
            {children}
        </AuthContext.Provider>
    )
}