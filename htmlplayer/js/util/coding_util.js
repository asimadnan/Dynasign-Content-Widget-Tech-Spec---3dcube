function decode(dText)
{
	dText = dText.replace(/%22/g,"\"");
	return dText.replace(/%20/g," ");

}