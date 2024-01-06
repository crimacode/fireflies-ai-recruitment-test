const data = require('./test.json');

const startTime = process.hrtime();

function createMergedTranscription(speakerJson, transcription) {
  // Map all speakers names to speaker ids in ascending order and store it in speaker_names_obj
  let speaker_names_obj = {};
  let speaker_names_exists = {};
  let count_speakers = 0;
  for (let speaker of speakerJson) {
    if (!(speaker.speakerName in speaker_names_exists)) {
      speaker_names_exists[speaker.speakerName] = count_speakers;
      speaker_names_obj[count_speakers] = speaker.speakerName;
      count_speakers++;
    }
  }
  // Assign all speakers name to speaker id and add the objects to mergedCaptions array
  let track_incorrect_speakers = 0;
  let mergedCaptions = [];
  for (let transcript of transcription) {
    // Check if the speaker_id is in the speaker_names_obj object, if yes, add the object to mergedCaptions array
    if (transcript.speaker_id in speaker_names_obj) {
      mergedCaptions.push({
        ...transcript,
        speaker_name: speaker_names_obj[transcript.speaker_id],
      });
    } else {
      // Run the following when speaker incorrectly identify more speakers than actually exist
      if (
        transcript.speaker_id &&
        !(transcript.speaker_id in speaker_names_obj)
      ) {
        speaker_names_obj[transcript.speaker_id] =
          speaker_names_obj[track_incorrect_speakers];
        mergedCaptions.push({
          ...transcript,
          speaker_name: speaker_names_obj[transcript.speaker_id],
        });
        track_incorrect_speakers++;
      } else {
        //   Run the following when speaker_id is not found, check the speakerJson to find the time and endTime where a minimum
        //   overlap happens between botSpeakers and asrTranscription
        let diff_time = Infinity;
        let diff_endTime = Infinity;
        let transcript_data = {};
        for (let speaker of speakerJson) {
          const current_diff_time = Math.abs(speaker.time - transcript.time);
          const current_diff_endTime = Math.abs(
            speaker.endTime - transcript.endTime,
          );
          if (
            current_diff_time <= diff_time &&
            diff_endTime >= current_diff_endTime
          ) {
            diff_time = current_diff_time;
            diff_endTime = current_diff_endTime;
            transcript_data = {
              ...transcript,
              speaker_name: speaker.speakerName,
            };
          }
        }
        mergedCaptions.push(transcript_data);
      }
    }
  }
  // Generate the speakerMeta data
  let speakerMeta = {};
  for (let speaker_num of Object.keys(speaker_names_obj)) {
    speakerMeta[parseInt(speaker_num) + 1] = speaker_names_obj[speaker_num];
  }
  console.log(speakerMeta);
  return mergedCaptions;
}

const info = createMergedTranscription(
  data.input.botSpeakers,
  data.input.asrTranscription,
);
console.log(info);

const endTime = process.hrtime(startTime);
console.log(
  'Time taken:',
  endTime[0] * 1000 + endTime[1] / 1000000,
  'milliseconds',
);

const usedMemory = process.memoryUsage();
const memoryInMB = {
  rss: (usedMemory.rss / 1024 / 1024).toFixed(2), // Resident Set Size
  heapTotal: (usedMemory.heapTotal / 1024 / 1024).toFixed(2), // Total Heap Size
  heapUsed: (usedMemory.heapUsed / 1024 / 1024).toFixed(2), // Heap Used
};

console.log('Memory usage in MB:', memoryInMB);