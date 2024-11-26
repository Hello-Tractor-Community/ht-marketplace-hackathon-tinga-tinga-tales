import BidProductCard from "@/app/(dealer)/_components/bid-product-card";
import {FilterSelectMenu, SortSelectMenu} from "@/app/(dealer)/_components/select-menus";
import ContentHeader from "@/app/(dealer)/_components/content-header";
import {ScrollArea} from "@/components/ui/scroll-area";

export default function BidsContents() {
    return (
        <div className={"flex flex-col h-[calc(100vh-5rem)] overflow-y-hidden p-2 space-y-4"}>
            <div className={""}>
                <ContentHeader header={"Bids"} sub={"Accept, Reject or Negotiate On Bids"}/>
                <div className={"w-full flex px-2 space-x-2 justify-end "}>
                    <FilterSelectMenu/>
                    <SortSelectMenu/>
                </div>
            </div>
            <ScrollArea className="max-h-screen overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 p-2">
                    {bids.map((bid) => (
                        <BidProductCard
                            key={bid.id}
                            product={bid.prduct}
                            time={bid.time}
                            bid={bid.bid}
                            bidder={bid.name}
                        />
                    ))}
                </div>
            </ScrollArea>

        </div>
    );
}

const bids = [
    {
        id: 1,
        name: "John Doe",
        time: "2 hours ago",
        bid: "1000",
        prduct: "https://s3-us-west-2.amazonaws.com/ht-mobileassets/ti_massey_ferguson_tractor_mf5710.png",
    }, {
        id: 12,
        name: "John Doe",
        time: "2 hours ago",
        bid: "1000",
        prduct: "https://s3-us-west-2.amazonaws.com/ht-mobileassets/ti_massey_ferguson_tractor_mf5710.png",
    }, {
        id: 13,
        name: "John Doe",
        time: "2 hours ago",
        bid: "1000",
        prduct: "https://ht-mobileassets.s3.amazonaws.com/tractorModels/DI-75-removebg-preview.png",
    }, {
        id: 14,
        name: "John Doe",
        time: "2 hours ago",
        bid: "1000",
        prduct: "https://ht-mobileassets.s3.amazonaws.com/tractorModels/New_Holland_TT75.png",
    }, {
        id: 16,
        name: "John Doe",
        time: "2 hours ago",
        bid: "1000",
        prduct: "https://ht-mobileassets.s3.amazonaws.com/tractorModels/Ford_3910.png",
    }, {
        id: 17,
        name: "John Doe",
        time: "2 hours ago",
        bid: "1000",
        prduct: "https://s3-us-west-2.amazonaws.com/ht-mobileassets/ti_massey_ferguson_400xtra.png",
    }, {
        id: 18,
        name: "John Doe",
        time: "2 hours ago",
        bid: "1000",
        prduct: "https://ht-mobileassets.s3.amazonaws.com/tractorModels/MF_2168_Rice_harvester.png",
    }, {
        id: 19,
        name: "John Doe",
        time: "2 hours ago",
        bid: "1000",
        prduct: "https://ht-mobileassets.s3.amazonaws.com/tractorModels/Kubota_DC70.png",
    }, {
        id: 145,
        name: "John Doe",
        time: "2 hours ago",
        bid: "1000",
        prduct: "https://ht-mobileassets.s3.amazonaws.com/tractorModels/Chungyu_Harvester_4LZ.png",
    }, {
        id: 1789,
        name: "John Doe",
        time: "2 hours ago",
        bid: "1000",
        prduct: "https://s3-us-west-2.amazonaws.com/ht-mobileassets/ti_massey_ferguson_400xtra.png",
    }, {
        id: 188876,
        name: "John Doe",
        time: "2 hours ago",
        bid: "1000",
        prduct: "https://ht-mobileassets.s3.amazonaws.com/tractorModels/MF_2168_Rice_harvester.png",
    }, {
        id: 1909,
        name: "John Doe",
        time: "2 hours ago",
        bid: "1000",
        prduct: "https://ht-mobileassets.s3.amazonaws.com/tractorModels/Kubota_DC70.png",
    }, {
        id: 14785,
        name: "John Doe",
        time: "2 hours ago",
        bid: "1000",
        prduct: "https://ht-mobileassets.s3.amazonaws.com/tractorModels/Chungyu_Harvester_4LZ.png",
    },

]