def to_lowercase(string=None, **kwargs):
  if string is None:
        string = kwargs.get("string")
        
  return string.lower()

def to_uppercase(string=None, **kwargs):
  if string is None:
        string = kwargs.get("string")
        
  return string.upper()