# Math image analyser

A Node.js application that uses the Google Cloud Vision API to detect mathematical visual elements (such as numbers, formulas, graphs) in images.

## Prerequisites

- **Node.js**: Ensure you have [Node.js](https://nodejs.org/) installed.
- **Google Cloud Vision API Key**: Set up a Google Cloud project, enable the Vision API, and get your API key. Follow the [setup guide here](https://cloud.google.com/vision/docs/setup).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kumarparth380/MathImageAnalyzer.git
   cd MathImageAnalyzer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Replace `'CLOUD_VISION_API_KEY'` in .env so it could be used in `index.js` with your actual Google Cloud Vision API key.

## Usage

1. Add your images (in `.png` format) to the `images/` folder.

2. Run the script:

   ```bash
   node index.js
   ```

The script will output whether each image contains mathematical visual elements (`true` or `false`).

## License

MIT License.
