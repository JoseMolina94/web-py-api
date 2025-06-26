import { FunctionSchemeData } from "@/types/functions"

//Las coloco juntas por la simplicidad de la prueba, por lo general cada una tendria su archivo separado

export const additionFunctionScheme: FunctionSchemeData = {
  value: 'addition',
  label: 'Suma',
  type: 'number',
  vars: 2,
  default: '0',
  kwargKeys: ['a', 'b']
}

export const subtractionFunctionScheme: FunctionSchemeData = {
  value: 'subtraction',
  label: 'Resta',
  type: 'number',
  vars: 2,
  default: '0',
  kwargKeys: ['a', 'b']
}

export const toLowercaseFunctionScheme: FunctionSchemeData = {
  value: 'to_lowercase',
  label: 'Convertir a minúsculas',
  type: 'text',
  vars: 1,
  default: '',
  kwargKeys: ['string']
}

export const toUppercaseFunctionScheme: FunctionSchemeData = {
  value: 'to_uppercase',
  label: 'Convertir a mayúsculas',
  type: 'text',
  vars: 1,
  default: '',
  kwargKeys: ['string']
}