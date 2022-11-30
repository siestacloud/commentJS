import Storage from "../db/storage.js";

class Models extends Storage {
  GetPreviosComments() {
    let storageData = this.Load("comments");
    if (storageData.length > 0) {
      return;
    }

    //save some comments in localStorage for test ...
    storageData.push({
      Unic: 0.111111111111111,
      Text: "Самое обидное когда сценарий по сути есть - в виде книг, где нет сюжетных дыр, всё логично, стройное повествование и достаточно взять и экранизировать оригинал как это было в первых фильмах с минимальным количеством отсебятины и зритель с восторгом примет любой такой фильм и сериал, однако вместо этого 'Кольца власти' просто позаимствовали имена из оригинала, куски истории, мало связанные между собой и выдали очередной среднячковый сериал на один раз в лучшем случае.",
      Icon: "img/user2.png",
      Name: "Joel Test1",
      Likes: 2,
      Answers: [],
      Favorite: false,
      CreateAt: "28/11, 21:41",
      Timestamp: 1669730242100,
    });
    storageData.push({
      Unic: 0.222222222222,
      Text: "Наверное, самая большая ошибка создателей сериала была в том, что они поставили уж слишком много надежд на поддержку фанатов вселенной. Как оказалось на деле, большинство 'фанатов' с самой настоящей яростью и желчью стали уничтожать сериал, при этом объективности в отзывах самый минимум.",
      Icon: "img/user3.png",
      Name: "Joel Test2",
      Likes: 5,
      Answers: [],
      Favorite: false,
      CreateAt: "28/11, 21:51",
      Timestamp: 1669730242900,
    });
    this.Save(JSON.stringify(storageData));
  }
}

export default Models;
