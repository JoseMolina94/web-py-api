'use client'

import { ChangeEvent, useState } from 'react'
import styles from "./page.module.css";

type tFunctionInput = {
  functionName: string
  var1?: string | number,
  var2?: string | number
}

type tFunctionOptionData = {
  value: string,
  label: string,
  type: string,
  vars: number,
  default?: string | number
}

export default function Home() {
  const functionsOptions = [
    {
      value: 'addition',
      label: 'Suma',
      type: 'number',
      vars: 2,
      default: '0'
    },
    {
      value: 'subtraction',
      label: 'Resta',
      type: 'number',
      vars: 2,
      default: '0'
    },
    {
      value: 'to_lowercase',
      label: 'Convertir a minusculas',
      type: 'text',
      vars: 1,
      default: ''
    },
    {
      value: 'to_uppercase',
      label: 'Convertir a mayusculas',
      type: 'text',
      vars: 1,
      default: ''
    },
  ]

  const [result, setResult] = useState('')
  const [inputs, setInputs] = useState<tFunctionInput>({ functionName: 'addition', var1: '0', var2: '0' })
  const [selectFunctionData, setSelectFunctionData] = useState<tFunctionOptionData | undefined>(functionsOptions[0])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/execute-function', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputs),
    })

    const data = await res.json()
    console.log("Envieado: ", JSON.stringify(inputs), " resultado: ", data)

    setResult(data.result)
  }

  const selectFunction = (event: ChangeEvent<HTMLSelectElement>) => {
    const functionName = event.target.value
    const functionData = functionsOptions.find((option: tFunctionOptionData) => option.value === functionName)

    setSelectFunctionData(functionData)

    setInputs({
      functionName,
      var1: functionData?.default,
      var2: functionData?.default
    })
  }

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <select onChange={selectFunction}>
          {
            functionsOptions.map((option: tFunctionOptionData, index: number) => (
              <option
                value={option.value}
                key={`function-option-${index}`}
              >
                {option.label}
              </option>
            ))
          }
        </select>

        {
          selectFunctionData &&
          <div>
            <div className={styles.inputsContainer}>
              {
                Array.from(new Array(selectFunctionData?.vars)).map((_, varItem: number) => (
                  <input
                    key={`input-var-${varItem + 1}`}
                    type={selectFunctionData.type}
                    placeholder={`Var${varItem + 1}`}
                    name={`var${varItem + 1}`}
                    onChange={e => onChangeInput(e)}
                    value={
                      (inputs as any)[`var${varItem + 1}`] || (selectFunctionData.type === 'number' ? '0' : '')
                    }
                  />
                ))
              }
            </div>

            <div className={styles.buttonAndResultContainer}>
              <button 
                className={styles.executeButton} 
                type="submit"
              >
                  Ejecutar
              </button>
              <p className={styles.resultLabel}>
                <strong>Resultado: </strong>
                {result}
              </p>
            </div>
          </div>
        }
      </form>
    </div>
  )
}
