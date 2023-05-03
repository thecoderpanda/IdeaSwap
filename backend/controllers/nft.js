//const web3 = require('web3');
const fs = require('fs');
const path = require('path');
//const nftmodel = require("../../models/nfts.js");
//const usermodel = require("../../models/User.js");
const axios = require('axios');
const FormData = require('form-data');
let image = fs.readFileSync(path.join(__dirname, './nfts/images.png'));



async function nftcontroller() {

    try {
        const form = new FormData();
        form.append('file', image);
        let url = 'https://api.nftport.xyz/v0/mints/easy/files';
    let data = {
        chain: 'polygon',
        name: "Test NFT",
        description: "NFT_Description",
        mint_to_address: "0xD4f4D3aC3365ADe003649FB27F3bd7dc00397058"
    }


    const response = await axios.post(url, image, data,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "6e866e4d-78a7-4c76-937c-a474e3be433b" 
        },

  
   
      
    }) 
    return response;

    }
    catch (error) {
        console.log(error);
    }

    //post request to create nft axios with headers
    



}
//create a function to delete nft 
async function deleteNFT() {
    const options = {
        method: 'DELETE',}
    }

// eslint-disable-next-line no-unused-expressions
module.exports = nftcontroller, deleteNFT;