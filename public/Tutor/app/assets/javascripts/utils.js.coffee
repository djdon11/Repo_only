window.capitalize = (str) ->
	str = str.toLowerCase().replace(/\b[a-z]/g, (letter)-> 
    return letter.toUpperCase();
	)

window.getParameterByName = (url, name) ->
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  regexS = "[\\?&]" + name + "=([^&#]*)";
  regex = new RegExp(regexS);
  results = regex.exec(url);
  
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));