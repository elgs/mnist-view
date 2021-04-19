const size = 28;
const imageIndex = parseInt(Deno.args[0]) || 0;

const labelFile = Deno.openSync('./mnist/train-labels-idx1-ubyte');
Deno.seekSync(labelFile.rid, 8 + imageIndex, Deno.SeekMode.Start);
const bufLable = new Uint8Array(1);
labelFile.readSync(bufLable);
Deno.close(labelFile.rid);


const imageFile = Deno.openSync('./mnist/train-images-idx3-ubyte');
Deno.seekSync(imageFile.rid, 16 + imageIndex * size * size, Deno.SeekMode.Start);
let bufImage = new Uint8Array(size * size);
imageFile.readSync(bufImage);
Deno.close(imageFile.rid);

bufImage = bufImage.map(b => b > 0 ? 1 : 0);

for (let i = 0; i < size; ++i) {
   const row = bufImage.slice(i * size, (i + 1) * size);
   console.log(row.join(''));
}

console.log('index: ', imageIndex);
console.log('lable: ', bufLable[0]);