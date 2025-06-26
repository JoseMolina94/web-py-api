def addition(a=None, b=None, **kwargs):
    if a is None:
        a = kwargs.get("a")
    if b is None:
        b = kwargs.get("b")
    return float(a) + float(b)

def subtraction(a=None, b=None, **kwargs):
    if a is None:
        a = kwargs.get("a")
    if b is None:
        b = kwargs.get("b")
    return float(a) - float(b)
