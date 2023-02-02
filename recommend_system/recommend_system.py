from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
app = Flask(__name__)
import numpy as np
from sklearn.preprocessing import OrdinalEncoder, StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def find_song_database(name, artist, songs):
    result = songs[(songs.artist_name == str(artist)) & (songs.track_name == str(name))]
    if len(result) == 0:
        return None
    return result.drop(['track_name', 'artist_name', 'Cluster'], axis=1)


def find_similar(name, artist, songs, top_n=10):
    database = songs[songs.popularity > 0.5].reset_index(drop=True)
    indx_names = database[['track_name', 'artist_name', 'Cluster']]
    songs_train = database.drop(['track_name', 'artist_name', 'Cluster'], axis=1)

    song = find_song_database(str(name), str(artist), database)

    if type(song) != type(None):
        indx_song = song.index

        cos_dists = cosine_similarity(songs_train, songs_train)
        indx_names.loc[:, ['result']] = cos_dists[indx_song[0]]

        indx_names = indx_names.sort_values(by=['result'], ascending=False)

        return indx_names[1:top_n].reset_index(drop=True)

    else:
        print("Song not found")
        return None


def playlist_song(name, artist, songs, n_songs=10):
    list_songs = find_similar(str(name), str(artist), songs, n_songs)
    
    if type(list_songs) != type(None):
        a= []
        for i in np.arange(0, len(list_songs)):
            track_name = list_songs.track_name[i]
            artist_name = list_songs.artist_name[i]
            b= dict({"track_name": track_name, "artist_name": artist_name})
            a.append(b)
        return a


data = pd.read_csv('C:/Users/admin/OneDrive/Desktop/rent/web_nhac/recommend_system/song.csv')
# print(data)
indx = data[['track_name', 'artist_name']]
attributes = data.drop(['track_id', 'time_signature', 'track_name', 'artist_name'], axis=1)
ordinal_encoder = OrdinalEncoder()
object_cols = ['mode']
attributes[object_cols] = ordinal_encoder.fit_transform(attributes[object_cols])

attributes = pd.get_dummies(attributes)
attributes.insert(loc=0, column='track_name', value=indx.track_name)
attributes.insert(loc=1, column='artist_name', value=indx.artist_name)
genres_names = ['genre_A Capella', 'genre_Alternative']

genres = attributes.groupby(['track_name', 'artist_name'])[genres_names].sum()

column_names = ['track_name', 'artist_name']
for i in genres_names:
    column_names.append(i)

genres.reset_index(inplace=True)
genres.columns = column_names

attributes = attributes.drop(genres_names, axis=1)

atts_cols = attributes.drop(['track_name', 'artist_name'], axis=1).columns
scaler = StandardScaler()
attributes[atts_cols] = scaler.fit_transform(attributes[atts_cols])

songs = pd.merge(genres, attributes, how='inner', on=['track_name', "artist_name"])
songs = songs.drop_duplicates(['track_name', 'artist_name']).reset_index(drop=True)
DF = pd.DataFrame(songs.drop(['track_name', 'artist_name'], axis=1))
kmeans = KMeans(n_clusters=17)
songs['Cluster'] = kmeans.fit_predict(DF)
# print('Test find similar song to Our Song - artist: Taylor Swift')

# dists = find_similar('', '', songs)
# print(dists)
@app.route('/suggest-search', methods=['GET'])
@cross_origin()
def get_tasks():
  
    dists= playlist_song(request.args.get("song_name"), request.args.get("artist_name"), songs, 11)
    return jsonify(dists)

if __name__ == '__main__':
    app.run(debug=True)