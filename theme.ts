'use client'

import { TextInput, Textarea, createTheme } from '@mantine/core'


export const theme = createTheme({
  colors: {
    'ocean-blue': [
      '#7AD1DD',
      '#5FCCDB',
      '#44CADC',
      '#2AC9DE',
      '#1AC2D9',
      '#11B7CD',
      '#09ADC3',
      '#0E99AC',
      '#128797',
      '#147885',
    ],
    'bright-pink': [
      '#F0BBDD',
      '#ED9BCF',
      '#EC7CC3',
      '#ED5DB8',
      '#F13EAF',
      '#F71FA7',
      '#FF00A1',
      '#E00890',
      '#C50E82',
      '#AD1374',
    ],
    neon: [
      '#e0fffc',
      '#cffcf5',
      '#a3f6ea',
      '#72f1de',
      '#4cedd4',
      '#34eace',
      '#1fe9cb',
      '#03ceb3',
      '#00b89f',
      '#00a089',
    ],
    grey: [
      '#f4f4f6',
      '#e6e6e6',
      '#cbcbcb',
      '#acaeb2',
      '#92959d',
      '#818590',
      '#797e8a',
      '#676c78',
      '#5a5f6c',
      '#4c5261',
    ],
    purple: [
      '#f6ecff',
      '#e7d6fb',
      '#caabf1',
      '#ac7ce8',
      '#9354e0',
      '#833cdb',
      '#7b2eda',
      '#6921c2',
      '#5d1cae',
      '#501599',
    ],
  },
  components: {
    TextInput: TextInput.extend({
      styles: {
        error: { color: 'red', fontSize: '0.875rem', animation: 'scaleIn 0.3s ease-out' },
        wrapper: { backgroundColor: '#25272C', borderRadius: '0.375rem' },
        input: {
          backgroundColor: '#25272C',
          fontSize: '0.875rem',
          color: 'white',
          transition: 'color 0.3s',
        },
      },
    }),
    Textarea: Textarea.extend({
      styles: {
        error: { color: 'red', fontSize: '0.875rem', animation: 'scaleIn 0.3s ease-out' },
        wrapper: { backgroundColor: '#25272C', borderRadius: '0.375rem' },
        input: {
          backgroundColor: '#25272C',
          fontSize: '0.875rem',
          color: 'white',
          transition: 'color 0.3s',
        },
      },
    }),
  },
})
