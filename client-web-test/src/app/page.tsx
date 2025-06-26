'use client'

import { ChangeEvent, useState, useEffect } from 'react'
import { FunctionSchemeData } from '@/types/functions'
import { 
  additionFunctionScheme, 
  subtractionFunctionScheme, 
  toLowercaseFunctionScheme, 
  toUppercaseFunctionScheme 
} from '@/schemes/functions'

import styles from "./page.module.css"

export default function Home() {
  const functionsOptions: FunctionSchemeData[] = [
    additionFunctionScheme,
    subtractionFunctionScheme,
    toLowercaseFunctionScheme,
    toUppercaseFunctionScheme
  ]

  const [useKwargs, setUseKwargs] = useState<boolean>(false)
  const [result, setResult] = useState('')
  const [selectedFunction, setSelectedFunction] = useState<FunctionSchemeData>(functionsOptions[0])
  const [args, setArgs] = useState<string[]>([])
  const [kwargs, setKwargs] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const body = {
      functionName: selectedFunction.value,
      args: useKwargs ? [] : args,
      kwargs: useKwargs ? kwargs : {}
    }

    const res = await fetch('/api/execute-function', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await res.json()
    console.log("Enviado:", body, "Respuesta:", data)

    setResult(data.result || data.error)
  }

  const selectFunction = (event: ChangeEvent<HTMLSelectElement>) => {
    const functionName = event.target.value
    const functionData = functionsOptions.find((f) => f.value === functionName)!
    setSelectedFunction(functionData)

    setArgs(new Array(functionData.vars).fill(functionData.default ?? ''))

    const newKwargs = (functionData.kwargKeys || []).reduce((acc, key) => {
      acc[key] = functionData.default?.toString() ?? ''
      return acc
    }, {} as Record<string, string>)

    setKwargs(newKwargs)
  }

  const onChangeArg = (index: number, value: string) => {
    const updatedArgs = [...args]
    updatedArgs[index] = value
    setArgs(updatedArgs)
  }

  const onChangeKwarg = (key: string, value: string) => {
    setKwargs(prev => ({ ...prev, [key]: value }))
  }

  useEffect(() => {
    setArgs(new Array(functionsOptions[0].vars).fill(functionsOptions[0].default ?? ''))
    setKwargs(
      (functionsOptions[0].kwargKeys || []).reduce((acc, key) => {
        acc[key] = functionsOptions[0].default?.toString() ?? ''
        return acc
      }, {} as Record<string, string>)
    )
  }, [])

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>

        <h1 className={styles.title}>
          Client Web Test
        </h1>
        <p className={styles.description}>
          Aquí puedes probar las funciones de la Python API. <br /><br />
          Puedes hacer envios usando el sistema de "args" o de "kwargs" utilizando el checkbox justo abajo.
        </p>

        <div className='check'>
          <label>
            Usar kwargs
          </label>

          <input
            className='checkbox'
            type="checkbox"
            checked={useKwargs}
            onChange={(e) => setUseKwargs(e.target.checked)}
          />
        </div>

        <select onChange={selectFunction} value={selectedFunction.value}>
          {functionsOptions.map((option, index) => (
            <option value={option.value} key={`function-option-${index}`}>
              {option.label}
            </option>
          ))}
        </select>

        <div>
          {useKwargs
            ? (
              <div className={styles.kwargsContainer}>
                {selectedFunction.kwargKeys?.map((key: string, index: number) => (
                  <div
                    key={`kwarg-${index}`}
                    className={styles.kwargRow}
                  >
                    <label className={styles.kwargLabel} >
                      {key}:
                    </label>
                    <input
                      type={selectedFunction.type}
                      placeholder={key}
                      value={kwargs[key] || ''}
                      onChange={(e) => onChangeKwarg(key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.inputsContainer}>
                {args.map((value: string, index: number) => (
                  <input
                    key={`arg-${index}`}
                    type={selectedFunction.type}
                    placeholder={`Arg ${index + 1}`}
                    value={value}
                    onChange={(e) => onChangeArg(index, e.target.value)}
                  />
                ))}
              </div>
            )}

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
      </form>
    </div>
  )
}
