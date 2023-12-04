export type Profile = {
  id: string; //uuid
  email?: string; //メールアドレス 取得しなくてもいい
  name: string; //表示名
  introduce?: string; //自己紹介テキスト
  icon_image?: string; //アイコン画像パス
  cover_image?: string; //カバー画像パス
  occupation?: string; //職種
};

export type Careers = {
	id: string; //uuid
	name: string; //会社名
	text?: string; //やったこと
	occupation?: string; //職種
	start?: Date; //開始日
	end: Date; //終了日
};