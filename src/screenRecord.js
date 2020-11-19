const recordScreen = require('record-screen')

const recording = recordScreen('./test.mp4', {
    inputFormat: 'mjpeg'
})

recording.promise
  .then(result => {
    // Screen recording is done
    process.stdout.write(result.stdout)
    process.stderr.write(result.stderr)
  })
  .catch(error => {
    // Screen recording has failed
    console.error(error)
  })

// As an example, stop the screen recording after 5 seconds:
setTimeout(() => recording.stop(), 5000)