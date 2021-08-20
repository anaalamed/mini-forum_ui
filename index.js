const express = require('express');
const path = require('path');

const app = express();


// const publicPath = path.join(__dirname, '..', 'public');
// app.use(express.static(publicPath));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(publicPath, 'index.html'));
//  });

// serve UI
app.use(express.static(path.resolve(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app is running on http://localhost:${port}`))
