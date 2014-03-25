App.Constants.ControlPanel.songDownloadTypes = [
  {name: "Free", value: "free"},
  {name: "$ Custom",value: "custom"},
  {name: "$ 0.99", value: "0.99"},
  {name: "$ 1.29", value: "1.29"},
  {name: "iTunes", value: "itunes"},
  {name: "Amazon", value: "amazon"}
];

App.Constants.ControlPanel.transitionStyles = [
  {name: "Normal", value: "normal"},
  {name: "Slide", value: "slide"},
  {name: "Fade", value: "fade"}
];

App.Constants.ControlPanel.currencies = [
			{name: "Australian Dollar", value:"AUD"},
      {name: "British Pound Sterling", value:"GBP"},
      {name: "Canadian Dollar", value:"CAD"},
      {name: "Czech Koruna", value:"CZK"},
      {name: "Danish Krone", value:"DKK"},
      {name: "Euro", value:"EUR"},
      {name: "Hong Kong Dolla", value:"HK"},
      {name: "Hungarian Forint", value:"HUF"},
      {name: "Israeli New Sheqel", value:"IL"},
      {name: "Japanese Yen", value:"JPY"},
      {name: "Mexian Peso", value:"MXN"},
      {name: "New Zealand Dollar", value: "NZD"},
      {name: "Norwegian Kron", value:"NO"},
      {name: "Singapore Dollar", value:"SGD"},
      {name: "Swedish Krona", value:"SEK"},
      {name: "Swiss Franc", value:"CHF"},
      {name: "US Dollar", value:"USD"}
    ];

App.Constants.ControlPanel.logoFonts = [
  {name:"Arial", value:"Arial"},
  {name:"Arial Bold", value:"Arial Bold"},
  {name:"Clarendon", value:"Clarendon"},
  {name:"Clarendon Bold", value:"Clarendon Bold"},
  {name:"Courier", value:"Courier"},
  {name:"Courier New", value:"Courier New"},
  {name:"Helvetica", value:"Helvetica"},
  {name:"Franklin Gothic", value:"Franklin Gothic"},
  {name:"Lucida Sans", value:"Lucida Sans"},
  {name:"Meta", value:"Meta"},
  {name:"Meta Bold", value:"Meta Bold"},
  {name:"Times New Roman", value:"Times New Roman"},
  {name:"Times New Roman Bold", value:"Times New Roman Bold"},
  {name:"Verdana", value:"Verdana"},
  {name:"Verdana Bold", value:"Verdana Bold"}
];

App.Constants.ControlPanel.logoAlignments = [
  {name: "Left", value: "Left"},
  {name: "Center", value: "Center"},
  {name: "Right", value: "Right"}
];

App.Constants.ControlPanel.cardTypes = [
  {name: "American Express", value: "American Express"},
  {name: "Discover", value: "Discover"},
  {name: "MasterCard", value: "MasterCard"},
  {name: "Visa", value: "Visa"}
];

App.Constants.ControlPanel.cardExpiryYear = (function() {
  var currentYear = new Date().getFullYear();
  var years = [];
  for(var i=0; i<12; i++) {
    years.push({name: currentYear+i,value:currentYear+i});
  }
  return years;
})();

App.Constants.ControlPanel.cardExpiryMonths = [
    {name:"JAN" , value: 1 },
    {name:"FEB" , value: 2 },
    {name:"MAR" , value: 3 },
    {name:"APR" , value: 4 },
    {name:"MAY" , value: 5 },
    {name:"JUN" , value: 6 },
    {name:"JUL" , value: 7 },
    {name:"AUG" , value: 8 },
    {name:"SEP" , value: 9 },
    {name:"OCT", value: 10},
    {name:"NOV", value: 11},
    {name:"DEC", value: 12}
];