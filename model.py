import sys
import pickle

with open('challans.pickle','rb') as handle:
    results = pickle.load(handle)

    print(str(results))
#   sys.stdout.flush()

# video_file_path = sys.argv[1]
# model(video_file_path)