import React from 'react';

export class FormOptions {
    static PlaceOptions(): JSX.Element {
        return (
            <>
                <option value=''>選択してください</option>
                {[
                    '北海道',
                    '青森県',
                    '岩手県',
                    '宮城県',
                    '秋田県',
                    '山形県',
                    '福島県',
                    '茨城県',
                    '栃木県',
                    '群馬県',
                    '埼玉県',
                    '千葉県',
                    '東京都',
                    '神奈川県',
                    '新潟県',
                    '富山県',
                    '石川県',
                    '福井県',
                    '山梨県',
                    '長野県',
                    '岐阜県',
                    '静岡県',
                    '愛知県',
                    '三重県',
                    '滋賀県',
                    '京都府',
                    '大阪府',
                    '兵庫県',
                    '奈良県',
                    '和歌山県',
                    '鳥取県',
                    '島根県',
                    '岡山県',
                    '広島県',
                    '山口県',
                    '徳島県',
                    '香川県',
                    '愛媛県',
                    '高知県',
                    '福岡県',
                    '佐賀県',
                    '長崎県',
                    '熊本県',
                    '大分県',
                    '宮崎県',
                    '鹿児島県',
                    '沖縄県',
                ].map((place, index) => {
                    return (
                        <option key={index} value={place}>
                            {place}
                        </option>
                    );
                })}
            </>
        );
    }
    static JobTypeOptions(): JSX.Element {
        return (
            <>
                <option value=''>選択してください</option>
                {[
                    '販売・接客サービス',
                    '飲食・フード',
                    '軽作業・製造・物流',
                    'ファッション・アパレル',
                    'オフィスワーク・事務',
                    'イベント・キャンペーン・アミューズメント',
                    'IT・クリエイティブ',
                    '教育・保育',
                    '医療・介護・福祉',
                    '建築・設備・アクティブワーク',
                    'ドライバー・配達',
                    'ヘルス・ビューティー',
                    '清掃・警備・ビルメンテナンス・家事代行',
                    '営業',
                ].map((jobType, index) => {
                    return (
                        <option key={index} value={jobType}>
                            {jobType}
                        </option>
                    );
                })}
            </>
        );
    }
}
