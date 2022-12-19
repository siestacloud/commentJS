import Storage from "../db/storage.js";

class Models extends Storage {
  public GetPreviosComments():void{
    let storageData = this.Load("comments");
    if (!storageData ) {
      storageData = []
      
      //save some comments in localStorage for test ...
      storageData.push( <never>{
        privateUnic: 0.111111111111111,
        privateText: "Самое обидное когда сценарий по сути есть - в виде книг, где нет сюжетных дыр, всё логично, стройное повествование и достаточно взять и экранизировать оригинал как это было в первых фильмах с минимальным количеством отсебятины и зритель с восторгом примет любой такой фильм и сериал, однако вместо этого 'Кольца власти' просто позаимствовали имена из оригинала, куски истории, мало связанные между собой и выдали очередной среднячковый сериал на один раз в лучшем случае.",
        privateIcon: "img/user2.png",
        privateName: "Алексей Румянцев",
        privateLikes: 2,
        privateAnswers: [],
        privateFavorite: false,
        privateCreateAt: "28/11, 21:41",
        privateTimestamp: 1669730242100,
      });
      storageData.push(<never>{
        privateUnic: 0.222222222222,
        privateText: "Наверное, самая большая ошибка создателей сериала была в том, что они поставили уж слишком много надежд на поддержку фанатов вселенной. Как оказалось на деле, большинство 'фанатов' с самой настоящей яростью и желчью стали уничтожать сериал, при этом объективности в отзывах самый минимум.",
        privateIcon: "img/user3.png",
        privateName: "Илья Златов",
        privateLikes: 5,
        privateAnswers: [],
        privateFavorite: false,
        privateCreateAt: "28/11, 21:51",
        privateTimestamp: 1669730242900,
      });
      this.Save(JSON.stringify(storageData));
      return
    }
    if (storageData.length > 0) {
      return;
    }

  }
}

export default Models;
