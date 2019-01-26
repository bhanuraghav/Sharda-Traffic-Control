import pickle

arr = ["DLRN463789","DLHU292948","DLXO783961"]

with open('challans.pickle','wb') as handle:
	pickle.dump(arr,handle)
