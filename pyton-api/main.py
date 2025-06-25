import sys
import importlib
import pkgutil

import numerics
import alfabetics

def discover_modules(package):
    return [
        name for _, name, _ in pkgutil.walk_packages(package.__path__, package.__name__ + ".")
    ]

def discover_functions():
    packages = [numerics, alfabetics]
    availables_functions = {}

    for package in packages:
        for module_name in discover_modules(package):
            module = importlib.import_module(module_name)
            for function_name in dir(module):
                if function_name.startswith("_"):
                    continue
                func = getattr(module, function_name)
                if callable(func):
                    availables_functions[function_name] = func

    return availables_functions

def show_functions(functions):
    print("📚 Funciones disponibles:")
    for name in functions:
        print(f" - {name}")

def main():
    functions = discover_functions()

    if "--help" in sys.argv:
        show_functions(functions)
        return

    if len(sys.argv) < 3:
        print("❗ Uso: python main.py <function_name> <var1> [<var2>]")
        print("Usa `--help` para ver la lista de funciones disponibles.")
        return

    function_name = sys.argv[1]
    var1 = sys.argv[2]
    var2 = sys.argv[3] if len(sys.argv) > 3 else None

    function = functions.get(function_name)

    if not function:
        print(f"❌ Función '{function_name}' no encontrada.\n")
        print("Usa `--help` para ver las funciones disponibles.")
        return

    try:
        resultado = function(var1, var2)
        print(f"✅ Resultado: {resultado}")
    except Exception as e:
        print(f"⚠️ Error al ejecutar la función: {e}")

if __name__ == "__main__":
    main()
