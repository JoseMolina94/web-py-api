import sys
import importlib
import pkgutil
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from dictionary import FUNCTION_METADATA

# Paquetes como módulos
import numerics
import alfabetics

# Descubrimiento dinámico de funciones
def discover_modules(package):
    return [
        name for _, name, _ in pkgutil.walk_packages(package.__path__, package.__name__ + ".")
    ]

def discover_functions():
    packages = [numerics, alfabetics]
    available_functions = {}

    for package in packages:
        for module_name in discover_modules(package):
            module = importlib.import_module(module_name)
            for function_name in dir(module):
                if function_name.startswith("_"):
                    continue
                func = getattr(module, function_name)
                if callable(func):
                    available_functions[function_name] = func

    return available_functions

# Mostrar funciones disponibles
def show_functions(functions):
    print("Funciones disponibles:\n")
    for name in functions:
        args = FUNCTION_METADATA.get(name, [])
        args_str = ", ".join(args) if args else "(argumentos dinámicos)"
        print(f" - {name}({args_str})")
    print("\nUsa: python main.py <function_name> <arg1> [<arg2> ...] o clave=valor")

# Ejecución desde la consola
def main():
    functions = discover_functions()

    if "--help" in sys.argv:
        show_functions(functions)
        return

    if len(sys.argv) < 2:
        print("Uso: python main.py <function_name> <arg1> [<arg2> ...] [clave=valor ...]")
        print("Usa `--help` para ver la lista de funciones disponibles.")
        return

    function_name = sys.argv[1]
    raw_args = sys.argv[2:]

    positional_args = []
    keyword_args = {}

    for arg in raw_args:
        if "=" in arg:
            key, value = arg.split("=", 1)
            keyword_args[key] = value
        else:
            positional_args.append(arg)

    function = functions.get(function_name)

    if not function:
        print(f"Función '{function_name}' no encontrada.\n")
        print("Usa `--help` para ver las funciones disponibles.")
        return

    try:
        result = function(*positional_args, **keyword_args)
        print(f"Resultado: {result}")
    except Exception as e:
        print(f"Error al ejecutar la función: {e}")

# API con FastAPI
app = FastAPI()
functions_cache = discover_functions()

class RequestModel(BaseModel):
    function: str
    args: List[Any] = []
    kwargs: Dict[str, Any] = {}

@app.post("/execute-function")
def execute_function(data: RequestModel):
    func = functions_cache.get(data.function)
    if not func:
        raise HTTPException(status_code=404, detail="Función no encontrada")

    try:
        result = func(*data.args, **data.kwargs)
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Ejecucion de terminal
if __name__ == "__main__":
    main()
