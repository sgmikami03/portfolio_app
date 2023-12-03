export type Profile ={
    id: string; //uuid
    email?: string; //メールアドレス 取得しなくてもいい
    name: string; //表示名
    introduce?: string; //自己紹介テキスト
    icon_image?: string; //アイコン画像パス
    cover_image?: string; //カバー画像パス
    occupation?: string; //職種
}