import React from "react";
import Image from "next/image";

type User = {
  name: string;
  accountName: string;
  image: string;
};

type Body = {
  text: string;
  image?: string /* optional */;
};

type Analytics = {
  path: string;
  count: number;
}[];

type CommonProps = {
  user: User;
  body: Body;
  analytics: Analytics;
};

type TweetProps = {
  type: "tweet";
};

type RetweetProps = {
  type: "retweet";
  retweetedUser: string;
};

type PromotionProps = {
  type: "promotion";
};

type TwitterCardProps = CommonProps &
  (TweetProps | RetweetProps | PromotionProps); /* intersection types */

const TwitterCard = (props: TwitterCardProps) => {
  return (
    <div className="bg-gray-200 pt-20 pb-80 flex items-center justify-center">
      <div className="bg-white border-gray-200 p-4 rounded-xl border max-w-xl min-w-[480px]">
        {props.type === "promotion" ? "プロモーション広告" : null}
        {props.type === "retweet"
          ? `${props.retweetedUser}さんがリツイートしました`
          : null}
        {/* ユーザー */}
        <div className="flex items-center">
          <Image
            className="h-11 w-11 rounded-full"
            src={props.user.image}
            alt=""
            width="44px"
            height="44px"
          />
          <div className="ml-1.5 text-sm leading-tight">
            <span className="text-black font-bold block ">
              {props.user.name}
            </span>
            <span className="text-gray-500 font-normal block">
              {`@${props.user.accountName}`}
            </span>
          </div>
        </div>
        {/* 本文 */}
        <div>
          <p className="text-black block text-xl leading-snug mt-3">
            {props.body.text}
          </p>
          {props.body.image ? (
            <Image
              className="mt-2 rounded-2xl border border-gray-100"
              src={props.body.image}
              alt=""
              width="542px"
              height="305px"
            />
          ) : null}
          <p className="text-gray-500 text-base py-1 my-0.5">
            11:22 AM · 2021年12月1日
          </p>
          {/* 統計 */}
          <div className="border-gray-200 border border-b-0 my-1" />
          <div className="text-gray-500 flex mt-3">
            {props.analytics.map(({ path, count }) => (
              <div key={count} className="flex items-center mr-6">
                <svg className="fill-current h-5 w-auto" viewBox="0 0 24 24">
                  <g>
                    <path d={path}></path>
                  </g>
                </svg>
                <span className="ml-3">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitterCard;
