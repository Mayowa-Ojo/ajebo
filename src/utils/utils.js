// utility functions

exports.generateHtml = function(_, data, rawHtml) {
   const htmlToArray = rawHtml.split('*');

   data.map((el,idx) => {
      const row = `
      <tr>
      <td style="border:1px solid #333;">${idx}</td>
      <td style="border:1px solid #333; text-align:center;"><div style="width: 10em; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${el.storedData.name}</div></td>
      <td style="border:1px solid #333; text-align:center; width:6em; color:#dc3545;">${JSON.stringify(el.storedData.sizes)}</td>
      <td style="border:1px solid #333; text-align:center">${el.storedData.productId}</td>
      
      <td style="border:1px solid #333; text-align:center;"><div style="width: 10em; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${el.liveData.name}</div></td>
      <td style="border:1px solid #333; text-align:center; width:6em; color:#dc3545;">${JSON.stringify(el.liveData.sizes)}</td>
      <td style="border:1px solid #333; text-align:center">${el.liveData.productId}</td>
      </tr>
      `

      htmlToArray.splice(htmlToArray.length-1, 0, row);
   });
   return htmlToArray.join('');
};