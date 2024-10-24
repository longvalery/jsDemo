export default async function getData(url) {
  let result = {};
  try {
    const response = await fetch(url);
    if (!response.ok) { throw new Error('Network response was not ok'); }
    result.isError = false;
    result.data = await response.json();
    return result; 
  } catch (error) {
    result.isError = true;
    result.data =  error;
    return result;
  }
}

//module.exports = { getData }
