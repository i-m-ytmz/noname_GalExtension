'use strict';
game.import("extension", function (lib, game, ui, get, ai, _status) {
    return {
        name: "萌神再临_牢",
        content: function (config, pack) {
        },
        precontent: function () { },
        config: {},
        help: {},

        package: {
            character: {
                character: {
                    // 希实香
                    "ms_xishixiang": ["female", "qun", 3, ["diy_zhuanhuan_sha", "ms_jianxiong"], ["des:【希实香】", "ext:mengshen/ms_xishixiang.jpg"]],
                    // 小帕
                    "ms_xiaopa": ["female", "qun", 4, ["ms_jianhu", "ms_gujia"], ["des:【小帕】", "ext:mengshen/ms_xiaopa.jpg"]],
                    // 朵鲁妲
                    "ms_duoluda": ["female", "qun", 3, ["ms_zhaoxin", "ms_hezou"], ["des:【朵鲁妲】", "ext:mengshen/ms_duoluda.jpg"]],
                    // ⚡【新增】：桂花。女性(female)，魏势力(wei)，三体力(3)
                    "ms_guihua": ["female", "wei", 3, ["ms_mingjie", "ms_huqu"], ["des:【桂花】", "ext:mengshen/ms_guihua.jpg"]],
                    // 天河沙夜
                    "ms_tianheshaye": ["female", "qun", 3, ["ms_xingxiang", "ms_xingxiang_resp"], ["des:【天河沙夜】", "ext:mengshen/ms_tianheshaye.jpg"]],
                    // 小雷
                    "ms_xiaolei": ["male", "qun", "1/4", ["ms_nangqing", "ms_xuanhu"], ["des:【小雷】", "ext:mengshen/ms_xiaolei.jpg"]],
                    // 瀬津美
                    "ms_setsumi": ["female", "qun", 3, ["ms_tiandu", "ms_yiji"], ["des:【瀬津美】", "ext:mengshen/ms_setsumi.jpg"]],
                    // 高岛柘榴
                    "ms_zhaliu": ["female", "qun", 3, ["ms_yinlang", "ms_huoshi", "ms_zhousha"], ["des:【高岛柘榴】", "ext:mengshen/ms_zhaliu.jpg"]],
                    // 古手梨花
                    "ms_lihua": ["female", "qun", 3, ["ms_shendao", "ms_leiji"], ["des:【古手梨花】", "ext:mengshen/ms_lihua.jpg"]],
                    //菜奶花
                    "ms_nanoka": ["female", "qun", 1, ["ms_nisu", "ms_duoji"], ["des:【綾崎菜乃花】", "ext:mengshen/ms_nanoka.jpg"]],
                    // 九条都
                    "ms_jiutiaodu": ["female", "qun", 3, ["ms_duorui", "ms_huashi"], ["des:【九条都】", "ext:mengshen/ms_jiutiaodu.jpg"]],
                    // 柴门环
                    "ms_chaimenhuan": ["female", "qun", 4, ["ms_niulun", "ms_jieai"], ["des:【柴门环】", "ext:mengshen/ms_chaimenhuan.jpg"]],
                    // 西尔维娅
                    "ms_xierweiya": ["female", "qun", 3, ["ms_zongheng", "ms_zhihe"], ["des:【西尔维娅】", "ext:mengshen/ms_xierweiya.jpg"]],
                },
                translate: {
                    "ms_xiaolei": "小雷",
                    "ms_tianheshaye": "天河沙夜",
                    "ms_xishixiang": "希实香",
                    "ms_xiaopa": "小帕",
                    "ms_duoluda": "朵鲁妲",
                    "ms_guihua": "桂花", // ⚡【新增】：武将中文翻译
                    "ms_setsumi": "瀬津美",
                    "ms_zhaliu": "高岛柘榴",
                    "ms_lihua": "古手梨花",
                    "ms_nanoka": "綾崎菜乃花",
                    "ms_jiutiaodu": "九条都",
                    "ms_chaimenhuan": "柴门环",
                    "ms_xierweiya": "西尔维娅",
                }
            },

            card: {
                card: {},
                translate: {},
                list: []
            },

            skill: {
                skill: {
                    // ================= 希实香的技能 =================
                    "diy_zhuanhuan_sha": {
                        // 【新增】：AI 控制逻辑（完美联动牵逊与举贤的高级苦肉计）
                        ai: {
                            order: 11, // 作为核心起手联动技，优先级极高
                            result: {
                                target: function (player, target) {
                                    var att = get.attitude(player, target);
                                    var isYin = player.storage.diy_zhuanhuan_sha;

                                    if (!isYin) {
                                        // 【阳状态】：用杀换敌人的牌。
                                        // 极大尺度仇恨（-20）：疯狂定向抢夺敌人的未知手牌/防御牌，
                                        // 同时故意把【杀】塞给他们，为阴状态的核弹级爆发做“养猪”准备！
                                        if (att < 0) return -20;
                                        return 0; // 绝对不抢队友的牌
                                    } else {
                                        // 【阴状态】：引爆敌人手里的同名牌（必然是我们喂的大量杀）来打自己。
                                        // 极大尺度仇恨（-30）：利用这神级联动，主动勾引敌人打自己一刀。
                                        // 敌人会把手里囤积的杀全部打出，随后我们通过【举贤】将这些牌全盘没收，直接清空敌人手牌！
                                        if (att < 0 && target.countCards('h') > 0) return -30;
                                        return 0;
                                    }
                                },
                                player: function (player, target) {
                                    // 只要是对敌人用，不仅能破坏手牌还能反向吸牌，自己稳赚不赔，发动意愿拉满（20）
                                    if (get.attitude(player, target) < 0) return 20;
                                    return 0;
                                }
                            }
                        },
                        zhuanhuanji: true,
                        mark: true,
                        marktext: "☯",
                        intro: {
                            content: function (storage, player, skill) {
                                if (storage) {
                                    return "当前处于【阴】状态：出牌阶段，你可以令一名其他角色将手牌中最多的同牌名牌当一张【杀】对你使用。";
                                } else {
                                    return "当前处于【阳】状态：出牌阶段，你可以用一张【杀】交换一名其他角色的一张手牌。";
                                }
                            }
                        },
                        enable: "phaseUse",
                        position: "h",
                        filterCard: function (card, player) {
                            if (player.storage.diy_zhuanhuan_sha) return false;
                            return get.name(card) == "sha";
                        },
                        selectCard: function () {
                            if (_status.event.player.storage.diy_zhuanhuan_sha) return 0;
                            return 1;
                        },
                        filterTarget: function (card, player, target) {
                            if (player == target) return false;
                            return target.countCards("h") > 0;
                        },
                        check: function (card) {
                            return 1;
                        },
                        content: function () {
                            "step 0";
                            if (!player.storage.diy_zhuanhuan_sha) {
                                player.choosePlayerCard(target, "h", true, "请选择获得 " + get.translation(target) + " 的一张手牌");
                            } else {
                                var targetCards = target.getCards("h");
                                var counts = {};
                                for (var i = 0; i < targetCards.length; i++) {
                                    var name = get.name(targetCards[i]);
                                    if (!counts[name]) counts[name] = [];
                                    counts[name].push(targetCards[i]);
                                }
                                var maxCount = 0;
                                for (var key in counts) {
                                    if (counts[key].length > maxCount) maxCount = counts[key].length;
                                }
                                var maxGroups = [];
                                for (var key in counts) {
                                    if (counts[key].length === maxCount) maxGroups.push(counts[key]);
                                }
                                var cardsToUse = maxGroups[Math.floor(Math.random() * maxGroups.length)];

                                target.useCard({ name: "sha" }, cardsToUse, player);
                                event.goto(2);
                            }
                            "step 1";
                            if (result.bool && result.links.length > 0) {
                                var targetCard = result.links[0];
                                player.gain(targetCard, target, "giveAuto");
                                target.gain(cards, player, "giveAuto");
                            } else {
                                target.gain(cards, player, "giveAuto");
                            }
                            "step 2";
                            player.storage.diy_zhuanhuan_sha = !player.storage.diy_zhuanhuan_sha;
                            player.markSkill("diy_zhuanhuan_sha");
                        }
                    },

                    "ms_jianxiong": {
                        // 【新增】：AI 卖血与防御威慑逻辑
                        ai: {
                            maixie: true,
                            maixie_hp: true, // 赋予极高的卖血倾向，告诉 AI 为了拿牌，掉血是完全值得的
                            effect: {
                                target: function (card, player, target, current) {
                                    // 威慑光环：如果有其他电脑敌人企图用杀/锦囊伤害你，
                                    // 系统会给出一个极高的负面评估（20），警告敌人“打她就是给她送牌”，
                                    // 从而在非阴状态下，大幅降低敌人主动攻击你的概率。
                                    if (get.tag(card, 'damage') && get.attitude(player, target) < 0) {
                                        return [1, 20];
                                    }
                                }
                            }
                        },
                        audio: 2,
                        trigger: {
                            player: "damageEnd",
                            source: "damageEnd"
                        },
                        filter: function (event, player) {
                            return event.cards && event.cards.filterInD().length > 0 && event.player.isAlive();
                        },
                        check: function (event, player) {
                            return get.attitude(player, event.player) > 0;
                        },
                        prompt: function (event, player) {
                            if (player == event.player) {
                                return "是否发动【举贤】，获得造成伤害的牌？";
                            } else {
                                return "是否发动【举贤】，令 " + get.translation(event.player) + " 获得造成伤害的牌？";
                            }
                        },
                        content: function () {
                            trigger.player.gain(trigger.cards.filterInD(), "gain2");
                        }
                    },

                    // ================= 小帕的技能 =================
                    "ms_jianhu": {
                        // 【新增】：AI 控制逻辑（超级保镖与伤害增幅器）
                        ai: {
                            order: 5,
                            result: {
                                target: function (player, target) {
                                    return 0; // 不在这里评估对目标的影响，在 chooseCard 里具体评估
                                },
                                player: function (player, target) {
                                    return 10;
                                }
                            }
                        },
                        trigger: { global: "useCardToTargeted" },
                        filter: function (event, player) {
                            // 新增了 player != event.target，排除自己作为目标的情况
                            return event.card.name == 'sha' && player != event.target && get.distance(player, event.target) <= 1 && player.countCards('h') > 0;
                        },
                        logTarget: "target",
                        // 【升级】：AI 的发动意愿与战术判断
                        check: function (event, player) {
                            var target = event.target;
                            var source = event.player;
                            var att = get.attitude(player, target);

                            // 战术 A：保镖模式（目标是队友）
                            // 队友挨刀，我们给牌保他，同时如果给完能摸牌，双重收益拉满！
                            if (att > 0) return true;

                            // 战术 B：杀人诛心模式（目标是死敌，且自己是出杀的人！）
                            // 如果自己正在砍敌人，且自己手牌很充足，可以故意塞给敌人一堆废牌，
                            // 触发下半段的【伤害强化】机制，给这刀加巨量伤害直接秒杀！
                            if (att < 0 && source === player) {
                                // 只有手牌多于体力值，才能触发伤害强化
                                if (player.countCards('h') > player.hp) return true;
                            }

                            return false;
                        },
                        content: function () {
                            "step 0"
                            var promptStr = "是否发动【监护】？交给 " + get.translation(trigger.target) + " 任意张手牌";
                            player.chooseCard('h', [1, player.countCards('h')], promptStr).set('ai', function (card) {
                                var player = _status.event.player;
                                var target = _status.event.getTrigger().target;
                                var source = _status.event.getTrigger().player;
                                var att = get.attitude(player, target);

                                // 如果是保队友：给防御牌（闪、桃等）或者没用的牌，尽量把自己的手牌降到体力值及以下来摸牌
                                if (att > 0) {
                                    if (card.name === 'shan' || card.name === 'tao') return 10;
                                    return 6 - get.value(card);
                                }

                                // 如果是杀敌人（为了加伤害）：疯狂塞最没用的废牌！
                                // 塞得越多，这刀的伤害加成越高！
                                if (att < 0 && source === player) {
                                    return 10 - get.value(card);
                                }

                                return 0;
                            });
                            "step 1"
                            if (result.bool) {
                                player.give(result.cards, trigger.target);
                                event.given_num = result.cards.length;
                            } else {
                                event.finish();
                            }
                            "step 2"
                            var handCount = player.countCards('h');
                            var num = event.given_num;

                            if (handCount <= player.hp) {
                                player.draw(num);
                                player.popup("摸牌");
                                game.log(player, "发动了【监护】，摸了", num, "张牌");
                            }
                            if (handCount >= player.hp) {
                                player.addTempSkill('ms_jianhu_damage', 'phaseEnd');
                                if (!player.storage.ms_jianhu_damage) player.storage.ms_jianhu_damage = [];
                                player.storage.ms_jianhu_damage.push({ card: trigger.card, target: trigger.target, num: num });
                                player.popup("伤害强化");
                                game.log(player, "发动了【监护】，令", trigger.card, "对", trigger.target, "的伤害+", num);
                            }
                        }
                    },
                    "ms_jianhu_damage": {
                        trigger: { global: "damageBegin" },
                        forced: true,
                        popup: false,
                        filter: function (event, player) {
                            if (!player.storage.ms_jianhu_damage) return false;
                            for (var i = 0; i < player.storage.ms_jianhu_damage.length; i++) {
                                if (event.card == player.storage.ms_jianhu_damage[i].card && event.player == player.storage.ms_jianhu_damage[i].target) return true;
                            }
                            return false;
                        },
                        content: function () {
                            for (var i = 0; i < player.storage.ms_jianhu_damage.length; i++) {
                                var data = player.storage.ms_jianhu_damage[i];
                                if (trigger.card == data.card && trigger.player == data.target) {
                                    trigger.num += data.num;
                                    player.storage.ms_jianhu_damage.splice(i, 1);
                                    break;
                                }
                            }
                        }
                    },
                    "ms_gujia": {
                        // 【新增】：AI 控制逻辑（隐忍的核弹限定技）
                        ai: {
                            order: 10, // 只要决定开限定技了，第一时间开
                            result: {
                                player: function (player) {
                                    var dmg = player.storage.ms_gujia_dmg || 0;
                                    // 核心判断：这个限定技的收益完全取决于自己之前挨了多少毒打。
                                    // 如果累计伤害达到 2 点（意味着这刀能额外多砍 2 个人），这波爆发就是极其恐怖的毁灭打击！
                                    if (dmg >= 2) return 20;

                                    // 如果自己快死了（绝境），不管累计了多少，能多砍一个是一个
                                    if (player.hp === 1 && dmg >= 1) return 15;

                                    // 还没积攒足够的怒气，继续隐忍，抗拒发动！
                                    return -20;
                                }
                            }
                        },
                        group: ["ms_gujia_counter"],
                        enable: "phaseUse",
                        limited: true,
                        skillAnimation: true,
                        mark: true,
                        intro: { content: "limited" },
                        filter: function (event, player) {
                            return !player.hasSkill('ms_gujia_used') && player.hasCard(function (card) { return get.name(card) == 'sha' }, 'hs');
                        },
                        content: function () {
                            player.awakenSkill('ms_gujia');
                            player.addSkill('ms_gujia_buff');
                            player.popup("骨甲");
                            game.log(player, "发动了限定技【骨甲】，本回合下一次使用的【杀】将获得强化");
                        }
                    },
                    "ms_gujia_buff": {
                        mod: {
                            selectTarget: function (card, player, range) {
                                if (card.name == 'sha' && range[1] != -1) {
                                    var x = player.storage.ms_gujia_dmg || 0;
                                    range[1] += x;
                                }
                            },
                            targetInRange: function (card, player, target, now) {
                                if (card.name == 'sha') return true;
                            }
                        },
                        trigger: { player: ["useCard", "phaseEnd"] },
                        filter: function (event, player, name) {
                            if (name == 'phaseEnd') return true;
                            return event.card.name == 'sha';
                        },
                        forced: true,
                        popup: false,
                        content: function () { player.removeSkill('ms_gujia_buff'); }
                    },
                    "ms_gujia_counter": {
                        trigger: { player: "damageEnd" },
                        forced: true,
                        popup: false,
                        content: function () {
                            if (!player.storage.ms_gujia_dmg) player.storage.ms_gujia_dmg = 0;
                            player.storage.ms_gujia_dmg += trigger.num;
                        }
                    },

                    // ================= 朵鲁妲的技能：昭心 =================
                    "ms_zhaoxin": {
                        // 【新增】：AI 控制逻辑（全面升级的狂热赌徒评估）
                        ai: {
                            order: 10, // 必须在出其他牌之前优先发动，优先级极高
                            result: {
                                player: function (player) {
                                    var hcards = player.getCards('h');
                                    var uniqueNames = [];
                                    var shaCount = 0;
                                    for (var i = 0; i < hcards.length; i++) {
                                        if (!uniqueNames.includes(hcards[i].name)) {
                                            uniqueNames.push(hcards[i].name);
                                        }
                                        if (hcards[i].name === 'sha') shaCount++;
                                    }

                                    // 【极大尺度意愿调优：高风险高回报】
                                    // 只要满足以下任意一项条件：
                                    // 1. 手里至少有1张【杀】（有一定底气赢下决斗）
                                    // 2. 手里牌的种类达到3种或以上（花样足够多，让敌人极难猜中）
                                    // AI 就会毫不犹豫地掀桌子，强行拉全场开始轮盘赌，发动意愿拉满（20）！
                                    if (shaCount >= 1 || uniqueNames.length >= 3) {
                                        return 20;
                                    }

                                    // 只有在弹尽粮绝（既没有杀，手牌种类又只有1~2种，被猜中率极高）的绝境下，
                                    // 才会认怂放弃，抗拒值拉满（-20），防止白白送死。
                                    return -20;
                                }
                            }
                        },
                        audio: "ext:mengshen:2",
                        enable: "phaseUse",
                        filter: function (event, player) {
                            // 【技能逻辑修改】：手牌必须大于0，且当前不能处于【昭心】生效中（防止连续重复发动）
                            return player.countCards('h') > 0 && !player.hasSkill('ms_zhaoxin_trigger');
                        },
                        content: function () {
                            "step 0"

                            var cards = player.getCards('h');
                            player.showCards(cards, get.translation(player) + '发动了【昭心】');

                            player.storage.ms_zhaoxin_targets = [];
                            player.storage.ms_zhaoxin_guesses = [];

                            event.targets = game.filterPlayer(function (current) {
                                return current != player;
                            });
                            event.targets.sort(lib.sort.seat);
                            event.num = 0;

                            "step 1"
                            if (event.num < event.targets.length) {
                                var target = event.targets[event.num];
                                var hcards = player.getCards('h');
                                var list = [];
                                for (var i = 0; i < hcards.length; i++) {
                                    list.add(hcards[i].name);
                                }
                                if (list.length == 0) {
                                    event.goto(3);
                                    return;
                                }
                                target.chooseControl(list).set('prompt', '【昭心】请猜测 ' + get.translation(player) + ' 本回合使用的下一张牌').set('ai', function () {
                                    // 【全场心理博弈 AI】
                                    var player = _status.event.getParent().player; // 朵鲁妲
                                    var target = _status.event.player;             // 正在猜牌的角色
                                    var controls = _status.event.controls;
                                    var att = get.attitude(target, player);

                                    // 敌人：极力猜中，企图反杀朵鲁妲
                                    if (att < 0) {
                                        if (controls.includes('wuzhong')) return 'wuzhong';
                                        if (controls.includes('shunshou')) return 'shunshou';
                                        if (controls.includes('guohe')) return 'guohe';
                                        if (controls.includes('sha')) return 'sha';
                                        return controls.randomGet();
                                    }
                                    // 队友：刻意猜错/猜废牌，保护自己和朵鲁妲不互相决斗
                                    else {
                                        if (controls.includes('shan')) return 'shan';
                                        if (controls.includes('tao')) return 'tao';
                                        if (controls.includes('wuxie')) return 'wuxie';
                                        return controls.randomGet();
                                    }
                                });
                            } else {
                                event.goto(3);
                            }

                            "step 2"
                            var target = event.targets[event.num];
                            if (result.control) {
                                player.storage.ms_zhaoxin_targets.push(target);
                                player.storage.ms_zhaoxin_guesses.push(result.control);
                                game.log(target, "猜测了", '#y' + get.translation(result.control));
                            }
                            event.num++;
                            event.goto(1);

                            "step 3"
                            player.addTempSkill('ms_zhaoxin_trigger', 'phaseUseEnd');
                        }
                    },
                    "ms_zhaoxin_trigger": {
                        trigger: { player: ["useCardAfter", "phaseUseEnd"] },
                        forced: true,
                        popup: false,
                        filter: function (event, player, name) {
                            if (name == 'phaseUseEnd') return true;
                            return player.storage.ms_zhaoxin_targets && player.storage.ms_zhaoxin_targets.length > 0;
                        },
                        content: function () {
                            "step 0"
                            if (event.triggername == 'phaseUseEnd') {
                                delete player.storage.ms_zhaoxin_targets;
                                delete player.storage.ms_zhaoxin_guesses;
                                player.removeSkill('ms_zhaoxin_trigger');
                                event.finish();
                                return;
                            }

                            event.realName = trigger.card.name;
                            event.targets = player.storage.ms_zhaoxin_targets;
                            event.guesses = player.storage.ms_zhaoxin_guesses;
                            event.num = 0;

                            delete player.storage.ms_zhaoxin_targets;
                            delete player.storage.ms_zhaoxin_guesses;
                            player.removeSkill('ms_zhaoxin_trigger');

                            "step 1"
                            if (event.num < event.targets.length) {
                                var target = event.targets[event.num];
                                var guess = event.guesses[event.num];
                                if (target.isAlive()) {
                                    if (guess == event.realName) {
                                        game.log(target, "猜测", '#g正确', "！", target, "视为对", player, "使用一张【决斗】");
                                        target.useCard({ name: 'juedou' }, player, false);
                                    } else {
                                        game.log(target, "猜测", '#r错误', "！", player, "视为对", target, "使用一张【决斗】");
                                        player.useCard({ name: 'juedou' }, target, false);
                                    }
                                }
                                event.num++;
                                event.goto(1);
                            }
                        }
                    },

                    // ================= 朵鲁妲的技能：合奏 =================
                    "ms_hezou": {
                        audio: "ext:mengshen:2",
                        trigger: { global: ["respond", "useCard"] },
                        frequent: true,
                        filter: function (event, player, name) {

                            var responder = event.player;
                            var source = null;

                            if (name == 'respond') {
                                var parent = event.getParent('useCard');
                                if (parent && parent.player) {
                                    if (parent.card && parent.card.name == 'juedou') {
                                        if (responder == parent.player) {
                                            source = parent.targets[0];
                                        }
                                        else {
                                            source = parent.player;
                                        }
                                    }
                                    else {
                                        source = parent.player;
                                    }
                                }
                                else if (event.respondTo && event.respondTo[1]) {
                                    source = event.respondTo[1];
                                }
                            }
                            else if (name == 'useCard') {
                                if (event.card && (event.card.name == 'wuxiekeji' || event.card.name == 'shan' || event.card.name == 'sha')) {
                                    var parent = event.getParent('useCard');
                                    if (parent && parent.player) {
                                        if (parent.card && parent.card.name == 'juedou') {
                                            if (responder == parent.player) {
                                                source = parent.targets[0];
                                            } else {
                                                source = parent.player;
                                            }
                                        }
                                        else if (parent.player != responder) {
                                            source = parent.player;
                                        }
                                    }
                                }
                            }

                            if (!source) return false;

                            if (responder == player && source != player) return true;
                            if (responder != player && source == player) return true;

                            return false;
                        },
                        content: function () {
                            player.draw();
                            player.popup("合奏");
                            game.log(player, "触发【合奏】，摸了一张牌");
                        }
                    },

                    // 一技能：命节 (最终拆分重构版)-------------------------------------------
                    ms_mingjie: {
                        // 主技能作为容器，将实际逻辑转交给两个隐藏子技能
                        group: ["ms_mingjie_shan", "ms_mingjie_wuxie"],
                        subSkill: {
                            // 子技能 1：专职处理【闪】
                            shan: {
                                enable: ["chooseToRespond", "chooseToUse"],
                                filterCard: function () { return false; },
                                selectCard: -1,
                                viewAs: { name: 'shan' },
                                filter: function (event, player) {
                                    if (player.countCards('h') === player.hp) return false;
                                    // 排除无懈时机，防止闪和无懈的按钮同时乱入
                                    if (event.type === 'wuxie') return false;

                                    if (typeof event.filterCard === 'function') {
                                        try {
                                            return event.filterCard({ name: 'shan', isCard: true }, player, event);
                                        } catch (e) { }
                                    }
                                    return false;
                                },
                                prompt: "点击发动【命节】，将手牌调整至当前体力值，视为使用【闪】",
                                // 【新增】：AI 控制逻辑（防守刷牌评估）
                                check: function (event, player) {
                                    // 大尺度收益：如果当前手牌数小于体力值，发动不仅能保命还能疯狂摸牌，意愿拉满（20）
                                    if (player.countCards('h') < player.hp) return 20;
                                    // 就算手牌比体力多，为了活命该弃牌还是得弃
                                    return 10;
                                },
                                onuse: function (result, player) {
                                    var next = game.createEvent('ms_mingjie_cost_shan');
                                    next.player = player;
                                    next.setContent(function () {
                                        "step 0"
                                        var num = player.hp - player.countCards('h');
                                        if (num > 0) {
                                            player.draw(num);
                                            event.goto(2);
                                        } else if (num < 0) {
                                            player.chooseToDiscard(Math.abs(num), true, 'h').set('prompt', '【命节】要求你将手牌调整至当前体力值，请弃置 ' + Math.abs(num) + ' 张手牌');
                                        }
                                        "step 1"
                                        "step 2"
                                        game.log(player, '将手牌数调整至', player.hp);
                                    });
                                }
                            },

                            // 子技能 2：专职处理【无懈可击】（拿着 VIP 通行证）
                            wuxie: {
                                enable: "chooseToUse",
                                filterCard: function () { return false; },
                                selectCard: -1,
                                // 重点：静态写死 viewAs，系统底层检测到这个属性就会强制给玩家发无懈弹窗
                                viewAs: { name: 'wuxie' },
                                filter: function (event, player) {
                                    if (player.countCards('h') === player.hp) return false;
                                    // 必须是无懈可击的专属触发时机
                                    return event.type === 'wuxie';
                                },
                                prompt: "点击发动【命节】，将手牌调整至当前体力值，视为使用【无懈可击】",
                                // 【新增】：AI 控制逻辑（配合虎驱的终极联动评估）
                                check: function (event, player) {
                                    // 大尺度收益：当刚放完【虎驱】底牌被掏空时，利用保护队友的无懈瞬间将牌抽满！
                                    if (player.countCards('h') < player.hp) return 20;
                                    return 10;
                                },
                                onuse: function (result, player) {
                                    var next = game.createEvent('ms_mingjie_cost_wuxie');
                                    next.player = player;
                                    next.setContent(function () {
                                        "step 0"
                                        var num = player.hp - player.countCards('h');
                                        if (num > 0) {
                                            player.draw(num);
                                            event.goto(2);
                                        } else if (num < 0) {
                                            player.chooseToDiscard(Math.abs(num), true, 'h').set('prompt', '【命节】要求你将手牌调整至当前体力值，请弃置 ' + Math.abs(num) + ' 张手牌');
                                        }
                                        "step 1"
                                        "step 2"
                                        game.log(player, '将手牌数调整至', player.hp);
                                    });
                                }
                            }
                        }
                    },
                    // 二技能：虎驱 (终极稳定版：手工拼点 + 强制搜身清算)
                    ms_huqu: {
                        // 【新增】：AI 控制逻辑（顶级碰瓷与自爆战术）
                        ai: {
                            order: 10, // 作为永动机的起手式，第一优先级发动
                            result: {
                                target: function (player, target) {
                                    // 极大尺度仇恨（-30）：找敌人拼点。
                                    // 因为拼赢的扣血，我们故意输，敌人赢了反而要挨1刀，纯纯的碰瓷恶心人！
                                    if (get.attitude(player, target) < 0) return -30;
                                    return 0; // 绝对不找队友，因为会让队友挨刀
                                },
                                player: function (player, target) {
                                    // 稳赚不赔的买卖，必定发动
                                    return 30;
                                }
                            }
                        },
                        enable: "phaseUse",
                        filterTarget: function (card, player, target) {
                            // 目标体力大于自己，且双方都有手牌
                            return target.hp > player.hp && player.countCards('h') > 0 && target.countCards('h') > 0;
                        },
                        content: function () {
                            "step 0"
                            // 手工底层拼点，免疫系统崩溃
                            player.chooseCard('【虎驱】请选择一张拼点牌', 1, 'h', true).set('ai', function (card) {
                                // 【AI 战术核心】：老子就是要输！故意把手里点数【最小】的牌扔出去！
                                return -get.number(card);
                            });
                            "step 1"
                            if (result.bool && result.cards && result.cards.length > 0) {
                                event.card1 = result.cards[0];
                                target.chooseCard('【虎驱】请选择一张拼点牌', 1, 'h', true).set('ai', function (card) {
                                    // 敌人 AI 正常出大牌企图赢
                                    return get.number(card);
                                });
                            } else {
                                event.finish();
                            }
                            "step 2"
                            if (result.bool && result.cards && result.cards.length > 0) {
                                event.card2 = result.cards[0];

                                player.$throw(event.card1, 1000);
                                target.$throw(event.card2, 1000);

                                game.log(player, '的拼点牌为', event.card1);
                                game.log(target, '的拼点牌为', event.card2);

                                var num1 = get.number(event.card1);
                                var num2 = get.number(event.card2);
                                game.log(player, '的点数为', '#y' + num1, '，', target, '的点数为', '#y' + num2);

                                event.pindianWin = (num1 > num2);

                                player.lose(event.card1, ui.discardPile, 'visible');
                                target.lose(event.card2, ui.discardPile, 'visible');
                            } else {
                                event.finish();
                            }
                            "step 3"
                            var winner, loser;
                            if (event.pindianWin) {
                                winner = player;
                                loser = target;
                                game.log(player, '拼点赢了！');
                            } else {
                                winner = target;
                                loser = player;
                                game.log(player, '拼点没赢...');
                            }

                            event.winner = winner;
                            event.loser = loser;

                            winner.damage(1, 'nocard');

                            "step 4"
                            var loser = event.loser;
                            var cards = loser.getCards('h');

                            if (cards.length > 0) {
                                var trickList = ['wuzhong', 'juedou', 'huogong', 'shunshou', 'guohe',
                                    'jiedao', 'tiesuo', 'nanman', 'wanjian', 'taoyuan', 'wugu'];
                                var list = [];
                                for (var i = 0; i < trickList.length; i++) {
                                    // 【核心修复】：构造无名杀原生标准的虚拟卡牌对象，彻底解决 ai/basic.js 扫描报错问题！
                                    list.push({ name: trickList[i], isCard: true });
                                }
                                loser.chooseButton(
                                    ['【虎驱代价】请选择要将你的所有手牌当做哪张普通锦囊牌使用', [list, 'vcard']],
                                    true
                                ).set('ai', function (button) {
                                    var name = button.link.name;
                                    var currentLoser = _status.event.player;
                                    var skillUser = _status.event.getParent().player; // 发动虎驱的主人

                                    // 【AI 战术分流】
                                    // 情况 A：如果是发动者自己故意输的，极高优先级（30）印 AOE（南蛮/万箭）发动【命节】白嫖补牌！
                                    if (currentLoser === skillUser) {
                                        if (name === 'nanman' || name === 'wanjian') return 30;
                                        if (name === 'wuzhong') return 25;
                                        if (name === 'taoyuan') return 20;
                                    }
                                    // 情况 B：如果是敌人拼点输了，优先印无中生有补牌或拆桥
                                    else {
                                        if (name === 'wuzhong') return 30;
                                        if (name === 'shunshou' || name === 'guohe') return 20;
                                    }

                                    var val = get.value(button.link, currentLoser);
                                    return typeof val === 'number' ? val : 5;
                                });
                            } else {
                                event.finish();
                            }

                            "step 5"
                            if (result && result.bool && result.links && result.links[0]) {
                                // 兼容对象或数组读取卡牌名字
                                var cardName = result.links[0].name || result.links[0][2];
                                var loser = event.loser;
                                var cards = loser.getCards('h');

                                if (cards.length === 0) { event.finish(); return; }

                                // 先将手牌作为锦囊的物质代价明示移出，用 lose 而非 discard，不触发"被弃牌"衍生技能
                                loser.lose(cards, ui.discardPile, 'visible');

                                // 再以无实体代价激活锦囊，无懈可击仍可正常响应
                                var useCard = { name: cardName, isCard: true };
                                loser.chooseUseTarget(useCard, true, false)
                                    .set('prompt', '【虎驱】请为【' + get.translation(cardName) + '】选择目标');
                            } else {
                                event.finish();
                            }

                            "step 6"
                            // 手牌已在 step 5 作为物质代价消耗，无需清算
                        }
                    },

                    // ================= 天河沙夜的技能代码 =================

                    // 星象 主技能（转换显示 + 模式②主动）
                    "ms_xingxiang": {
                        // 【新增】：AI 控制逻辑
                        ai: {
                            order: 9, // 起手观星控顶+摸牌，优先级极高
                            result: {
                                player: function (player) {
                                    // 只要处于主动模式，稳赚不赔的控顶与摸牌神技，发动意愿拉满
                                    return 20;
                                }
                            }
                        },
                        zhuanhuanji: true,
                        mark: true,
                        marktext: "✦",
                        intro: {
                            content: function (storage, player, skill) {
                                var num = (player.storage.ms_xingxiang_num != null) ? player.storage.ms_xingxiang_num : 7;
                                var base = '猜测牌堆顶（已损失体力值＋<span style="color:red">' + num + '</span>）张牌的颜色并观看之。<br>有错误可移动这些牌；每错误一张令红色数字-1（至少为1）；每正确一张摸一张牌。';
                                if (!storage) {
                                    return '当前①响应模式：一名角色使用基本牌时，你可以令此牌无效，然后' + base;
                                } else {
                                    return '当前②主动模式：出牌阶段，你可以' + base;
                                }
                            }
                        },

                        enable: "phaseUse",
                        filter: function (event, player) {
                            return !!player.storage.ms_xingxiang; // 仅②模式激活
                        },

                        content: function () {
                            "step 0"
                            if (player.storage.ms_xingxiang_num == null) {
                                player.storage.ms_xingxiang_num = 7;
                            }
                            var redNum = player.storage.ms_xingxiang_num;
                            var lostHp = player.maxHp - player.hp;
                            event.n = Math.max(1, lostHp + redNum);
                            event.guesses = [];
                            event.guessIndex = 0;

                            "step 1"
                            if (event.guessIndex < event.n) {
                                player.chooseControl('红色', '黑色').set('prompt', '【星象主动】请猜测第 ' + (event.guessIndex + 1) + ' / ' + event.n + ' 张牌的颜色').set('ai', function () {
                                    return Math.random() > 0.5 ? '红色' : '黑色';
                                });
                            } else {
                                event.goto(3);
                            }

                            "step 2"
                            event.guesses.push(result.control === '红色' ? 'red' : 'black');
                            event.guessIndex++;
                            event.goto(1);

                            "step 3"
                            event.topCards = get.cards(event.n);
                            game.log(player, '观看了牌堆顶的', '#y' + event.n, '张牌');

                            "step 4"
                            var correctCount = 0, wrongCount = 0;
                            for (var i = 0; i < event.topCards.length && i < event.guesses.length; i++) {
                                if (get.color(event.topCards[i]) === event.guesses[i]) correctCount++;
                                else wrongCount++;
                            }
                            event.correctCount = correctCount;
                            event.wrongCount = wrongCount;

                            "step 5"
                            if (event.wrongCount > 0 && event.topCards && event.topCards.length > 0) {
                                player.chooseToMove('【星象】猜错了 ' + event.wrongCount + ' 张！请将这些牌任意移动至牌堆顶或牌堆底').set('list', [
                                    ['牌堆顶', event.topCards],
                                    ['牌堆底']
                                ]);
                            } else {
                                while (event.topCards.length > 0) {
                                    ui.cardPile.insertBefore(event.topCards.pop(), ui.cardPile.firstChild);
                                }
                                game.updateRoundNumber();
                                event.goto(7);
                            }

                            "step 6"
                            if (result && result.moved) {
                                var top = result.moved[0];
                                var bottom = result.moved[1];
                                while (top.length > 0) {
                                    ui.cardPile.insertBefore(top.pop(), ui.cardPile.firstChild);
                                }
                                while (bottom.length > 0) {
                                    ui.cardPile.appendChild(bottom.shift());
                                }
                                game.updateRoundNumber();
                            } else {
                                var topFallback = event.topCards || [];
                                while (topFallback.length > 0) {
                                    ui.cardPile.insertBefore(topFallback.pop(), ui.cardPile.firstChild);
                                }
                                game.updateRoundNumber();
                            }

                            "step 7"
                            if (event.wrongCount > 0) {
                                player.storage.ms_xingxiang_num = Math.max(1, player.storage.ms_xingxiang_num - event.wrongCount);
                                game.log(player, '猜错了', '#y' + event.wrongCount, '张牌，红色数字降为', '#r' + player.storage.ms_xingxiang_num);
                            }
                            if (event.correctCount > 0) {
                                game.log(player, '猜对了', '#g' + event.correctCount, '张牌');
                                player.draw(event.correctCount);
                            }
                            player.markSkill('ms_xingxiang');

                            "step 8"
                            player.storage.ms_xingxiang = !player.storage.ms_xingxiang;
                            player.markSkill('ms_xingxiang');
                        }
                    },

                    // 星象 响应子技能（模式①触发，隐藏）
                    "ms_xingxiang_resp": {
                        charlotte: true,
                        trigger: { global: 'useCard' },
                        filter: function (event, player) {
                            if (!player.hasSkill('ms_xingxiang')) return false;
                            if (player.storage.ms_xingxiang) return false; // 仅①模式激活 (false 时)
                            return get.type(event.card) === 'basic';
                        },
                        check: function (event, player) {
                            // 【升级】：AI 响应逻辑强化（大尺度仇恨控制）
                            var att = get.attitude(player, event.player);
                            if (att < 0) {
                                // 极大尺度仇恨（20）：如果敌人使用关键的基本牌（杀、酒、桃），毫不犹豫地没收！
                                // 既能打断敌人的进攻/自救，自己又能趁机观星摸牌，双重收益拉满！
                                if (['sha', 'jiu', 'tao'].includes(event.card.name)) return 20;
                                // 对于【闪】等其他基本牌，也可以顺手牵羊没收
                                return 10;
                            }
                            // 绝对包庇：队友出的牌绝对不无效，不当内鬼
                            return 0;
                        },
                        prompt: function (event, player) {
                            return '是否发动【星象】令 ' + get.translation(event.player) + ' 使用的 ' + get.translation(event.card) + ' 无效，并开始观星？';
                        },
                        content: function () {
                            "step 0"
                            player.logSkill('ms_xingxiang', trigger.player);
                            game.log(trigger.player, '使用的', trigger.card, '被', player, '无效化！');
                            // 拦截并强制终止该卡牌的使用结算
                            trigger.cancel();

                            "step 1"
                            if (player.storage.ms_xingxiang_num == null) {
                                player.storage.ms_xingxiang_num = 7;
                            }
                            var redNum = player.storage.ms_xingxiang_num;
                            var lostHp = player.maxHp - player.hp;
                            event.n = Math.max(1, lostHp + redNum);
                            event.guesses = [];
                            event.guessIndex = 0;

                            "step 2"
                            if (event.guessIndex < event.n) {
                                player.chooseControl('红色', '黑色').set('prompt', '【星象响应】请猜测第 ' + (event.guessIndex + 1) + ' / ' + event.n + ' 张牌的颜色').set('ai', function () {
                                    return Math.random() > 0.5 ? '红色' : '黑色';
                                });
                            } else {
                                event.goto(4);
                            }

                            "step 3"
                            event.guesses.push(result.control === '红色' ? 'red' : 'black');
                            event.guessIndex++;
                            event.goto(2);

                            "step 4"
                            event.topCards = get.cards(event.n);
                            game.log(player, '观看了牌堆顶的', '#y' + event.n, '张牌');

                            "step 5"
                            var correctCount = 0, wrongCount = 0;
                            for (var i = 0; i < event.topCards.length && i < event.guesses.length; i++) {
                                if (get.color(event.topCards[i]) === event.guesses[i]) correctCount++;
                                else wrongCount++;
                            }
                            event.correctCount = correctCount;
                            event.wrongCount = wrongCount;

                            "step 6"
                            if (event.wrongCount > 0 && event.topCards && event.topCards.length > 0) {
                                player.chooseToMove('【星象】猜错了 ' + event.wrongCount + ' 张！请将这些牌任意移动至牌堆顶或牌堆底').set('list', [
                                    ['牌堆顶', event.topCards],
                                    ['牌堆底']
                                ]);
                            } else {
                                while (event.topCards.length > 0) {
                                    ui.cardPile.insertBefore(event.topCards.pop(), ui.cardPile.firstChild);
                                }
                                game.updateRoundNumber();
                                event.goto(8);
                            }

                            "step 7"
                            if (result && result.moved) {
                                var top = result.moved[0];
                                var bottom = result.moved[1];
                                while (top.length > 0) {
                                    ui.cardPile.insertBefore(top.pop(), ui.cardPile.firstChild);
                                }
                                while (bottom.length > 0) {
                                    ui.cardPile.appendChild(bottom.shift());
                                }
                                game.updateRoundNumber();
                            } else {
                                var topFallback = event.topCards || [];
                                while (topFallback.length > 0) {
                                    ui.cardPile.insertBefore(topFallback.pop(), ui.cardPile.firstChild);
                                }
                                game.updateRoundNumber();
                            }

                            "step 8"
                            if (event.wrongCount > 0) {
                                player.storage.ms_xingxiang_num = Math.max(1, player.storage.ms_xingxiang_num - event.wrongCount);
                                game.log(player, '猜错了', '#y' + event.wrongCount, '张牌，红色数字降为', '#r' + player.storage.ms_xingxiang_num);
                            }
                            if (event.correctCount > 0) {
                                game.log(player, '猜对了', '#g' + event.correctCount, '张牌');
                                player.draw(event.correctCount);
                            }
                            player.markSkill('ms_xingxiang');

                            "step 9"
                            player.storage.ms_xingxiang = !player.storage.ms_xingxiang;
                            player.markSkill('ms_xingxiang');
                        }
                    },

                    // ================= 小雷的技能代码 =================

                    // --- 囊青 ---
                    // 容器技能，实际逻辑交给三个隐藏子技能
                    "ms_nangqing": {
                        group: ["ms_nangqing_self", "ms_nangqing_other", "ms_nangqing_draw"],
                        subSkill: {
                            // ① 别人打我：受伤转回血
                            "self": {
                                trigger: { player: "damageBefore" },
                                forced: true,
                                filter: function (event, player) {
                                    // 必须有伤害来源，且伤害来源不能是自己
                                    return event.source && event.source !== player;
                                },
                                content: function () {
                                    trigger.cancel();
                                    game.log(player, '触发了', '#g【囊青】', '，防止了伤害并回复体力');
                                    player.recover(trigger.num);
                                }
                            },
                            // ② 我打别人：受伤转回血 + 无条件塞标记
                            "other": {
                                trigger: { source: "damageBefore" },
                                forced: true,
                                filter: function (event, player) {
                                    return event.player !== player;
                                },
                                content: function () {
                                    trigger.cancel();
                                    var target = trigger.player;
                                    var num = trigger.num;

                                    // 无条件给对方塞入对应伤害数值的标记
                                    target.addMark('ms_zhi', num);

                                    // 动态判定对方是否满血
                                    if (target.hp < target.maxHp) {
                                        game.log(player, '触发了', '#g【囊青】', '，防止了对', target, '的伤害，令其获得', '#y' + num + '个', '#g【治】', '标记并回复体力');
                                        target.recover(num);
                                    } else {
                                        game.log(player, '触发了', '#g【囊青】', '，防止了对', target, '的伤害，令其获得了', '#y' + num + '个', '#g【治】', '标记');
                                    }
                                }
                            },
                            // ③ 回血摸牌
                            "draw": {
                                trigger: { player: "recoverAfter" },
                                forced: true,
                                content: function () {
                                    player.draw(2);
                                }
                            }
                        }
                    },

                    // --- 悬壶 ---
                    "ms_xuanhu": {
                        // 【新增】：AI 控制逻辑（完美契合你的“毒奶刷标记”战术）
                        ai: {
                            order: 7,
                            result: {
                                target: function (player, target) {
                                    var att = get.attitude(player, target);

                                    // 给队友回血，永远是正收益
                                    if (att > 0) return 15;

                                    // 对待敌人，开启“资本家”模式榨取剩余价值：
                                    var isAwake = player.hasSkill('ms_jishi');
                                    if (isAwake) {
                                        var opt1 = player.storage.ms_jishi_opt1 || [];
                                        var opt2 = player.storage.ms_jishi_opt2 || [];
                                        // 【停止供血机制】：如果觉醒后，两次济世全在这人身上交完了，
                                        // 他就彻底没有利用价值了！坚决不再给他回血，防止白当内鬼。
                                        if (opt1.includes(target) && opt2.includes(target)) {
                                            return -20;
                                        }
                                    }

                                    // 只要还没被榨干价值，就猛烈毒奶！
                                    // 优先给“残血”的敌人回血，因为收益极高（20），我们拿标记，他虚高的血量挡不住济世爆发
                                    if (target.hp < target.maxHp) return 20;

                                    // 给满血敌人发动等同于白赚一个标记
                                    return 10;
                                }
                            }
                        },
                        enable: "phaseUse",
                        group: ["ms_xuanhu_clear", "ms_xuanhu_awake"],
                        filterCard: function (card) {
                            return get.color(card) == 'red';
                        },
                        position: 'he',
                        filterTarget: function (card, player, target) {
                            // 出牌阶段每名角色限一次
                            if (player.storage.ms_xuanhu && player.storage.ms_xuanhu.includes(target)) return false;
                            return true;
                        },
                        check: function (card) {
                            return 6 - get.value(card);
                        },
                        content: function () {
                            if (!player.storage.ms_xuanhu) player.storage.ms_xuanhu = [];
                            player.storage.ms_xuanhu.push(target);

                            target.recover(1);
                            target.addMark('ms_zhi', 1);
                            game.log(target, '获得了1个', '#g【治】', '标记');
                        },
                        subSkill: {
                            // 幕后清算：回合结束清理【悬壶】的使用记录
                            "clear": {
                                trigger: { player: "phaseUseAfter" },
                                silent: true,
                                content: function () {
                                    delete player.storage.ms_xuanhu;
                                }
                            },
                            // 幕后觉醒：回复至满体力转换技能
                            "awake": {
                                trigger: { player: "recoverAfter" },
                                forced: true,
                                skillAnimation: true,
                                animationColor: 'orange',
                                filter: function (event, player) {
                                    return player.hp >= player.maxHp && !player.storage.ms_xuanhu_awake;
                                },
                                content: function () {
                                    game.log(player, '的体力达到了上限，触发觉醒！');
                                    player.storage.ms_xuanhu_awake = true;
                                    player.awakenSkill('ms_xuanhu');
                                    player.removeSkill('ms_nangqing');
                                    player.addSkill('ms_jishi');
                                }
                            }
                        }
                    },

                    // --- 济世 (修复报错，纯净底层选择版) ---
                    "ms_jishi": {
                        // 【新增】：AI 控制逻辑（收割机器）
                        ai: {
                            order: 10, // 只要能引爆收割，绝对优先发动
                            result: {
                                target: function (player, target) {
                                    // 极大尺度仇恨（-30）：之前养的猪，现在该宰了！
                                    // 造成双倍伤害或者直接掏空对面两倍数量的手牌，极度暴力。
                                    if (get.attitude(player, target) < 0) return -30;
                                    return 0; // 绝对不搞队友
                                },
                                player: function (player, target) {
                                    return 20; // 超高自身收益
                                }
                            }
                        },
                        enable: "phaseUse",
                        group: ["ms_jishi_clear"],
                        filterTarget: function (card, player, target) {
                            // 必须有治标记
                            var marks = target.countMark ? target.countMark('ms_zhi') : (target.storage.ms_zhi || 0);
                            if (marks < 1) return false;

                            var opt1 = player.storage.ms_jishi_opt1 || [];
                            var opt2 = player.storage.ms_jishi_opt2 || [];
                            return !opt1.includes(target) || !opt2.includes(target);
                        },
                        content: function () {
                            "step 0"
                            var marks = target.countMark ? target.countMark('ms_zhi') : (target.storage.ms_zhi || 0);

                            // 【核心修复】：手动生成一个数字字符串数组，喂给标准 chooseControl 接口
                            var numList = [];
                            for (var i = 1; i <= marks; i++) {
                                numList.push(String(i));
                            }

                            // 第一步：弹出选项让玩家选数字
                            player.chooseControl(numList).set('prompt', '请选择要移除的【治】标记数量').set('ai', function () {
                                return String(marks); // AI 默认全移除，将收益最大化
                            });

                            "step 1"
                            // 将玩家选中的字符串数字解析回真实的整数，若异常则保底为 1
                            var num = parseInt(result.control) || 1;
                            event.jishi_num = num;

                            // 构造还能使用的选项
                            var list = [];
                            var opt1 = player.storage.ms_jishi_opt1 || [];
                            var opt2 = player.storage.ms_jishi_opt2 || [];

                            if (!opt1.includes(target)) list.push('造成两倍伤害');
                            if (!opt2.includes(target)) list.push('获得两倍卡牌');
                            list.push('cancel2'); // 提供取消按钮

                            // 第二步：根据刚才选的数量，选择执行的效果
                            player.chooseControl(list).set('prompt', '将移除 ' + num + ' 个标记，请选择对 ' + get.translation(target) + ' 执行的效果').set('ai', function () {
                                if (list.includes('造成两倍伤害') && (target.hp <= num * 2 || list.length === 1)) return '造成两倍伤害';
                                return '获得两倍卡牌';
                            });

                            "step 2"
                            if (result.control === 'cancel2') {
                                event.finish(); // 玩家取消，终止技能且不扣标记
                                return;
                            }

                            var num = event.jishi_num;

                            // 正式扣除标记
                            target.removeMark('ms_zhi', num);
                            game.log(player, '移除了', target, '#y' + num + '个', '#g【治】');

                            // 走向不同的结算分支
                            if (result.control === '造成两倍伤害') {
                                if (!player.storage.ms_jishi_opt1) player.storage.ms_jishi_opt1 = [];
                                player.storage.ms_jishi_opt1.push(target); // 记录此项已用

                                target.damage(num * 2);
                                event.finish();
                            } else {
                                if (!player.storage.ms_jishi_opt2) player.storage.ms_jishi_opt2 = [];
                                player.storage.ms_jishi_opt2.push(target); // 记录此项已用

                                // 获取目标两倍数量的牌
                                var maxGain = Math.min(target.countCards('he'), num * 2);
                                if (maxGain > 0) {
                                    player.choosePlayerCard(target, 'he', true)
                                        .set('prompt', '请选择获得 ' + get.translation(target) + ' 的 ' + maxGain + ' 张牌')
                                        .set('selectButton', [maxGain, maxGain]);
                                } else {
                                    event.finish();
                                }
                            }

                            "step 3"
                            // 处理获得卡牌的最终结算
                            var cards = result.cards || result.links;
                            if (result.bool && cards && cards.length > 0) {
                                player.gain(cards, target, 'give');
                            }
                        },
                        subSkill: {
                            // 幕后清算：回合结束清理使用限次
                            "clear": {
                                trigger: { player: "phaseUseAfter" },
                                silent: true,
                                content: function () {
                                    delete player.storage.ms_jishi_opt1;
                                    delete player.storage.ms_jishi_opt2;
                                }
                            }
                        }
                    },

                    // ================= 瀬津美的技能代码 =================
                    // ================= 瀬津美技能 (底层逻辑全修复版) =================

                    // --- 天妒 ---
                    "ms_tiandu": {
                        zhuanhuanji: true,
                        mark: true,
                        marktext: "✦",
                        forced: true,
                        intro: {
                            content: function (storage, player, skill) {
                                if (!storage) {
                                    return '锁定技，当你的上家或下家受到伤害后，你受到等量伤害。触发后切换形态。';
                                } else {
                                    return '锁定技，你成为【杀】的目标后，你回复一点体力。触发后切换形态。';
                                }
                            }
                        },
                        // 挂载两个修复后的隐藏子技能
                        group: ["ms_tiandu_effect1", "ms_tiandu_effect2"]
                    },

                    // 修复版形态①：绑定上下家伤害
                    "ms_tiandu_effect1": {
                        trigger: { global: "damageEnd" }, // 【修复】：标准伤害结束时机是 damageEnd
                        forced: true,
                        filter: function (event, player) {
                            if (player.storage.ms_tiandu) return false;
                            // 判定伤害目标是否为自己的上家或下家
                            return event.player === player.getNext() || event.player === player.getPrevious();
                        },
                        content: function () {
                            player.logSkill('ms_tiandu');
                            game.log(player, '由于旁侧角色受到伤害，触发【天妒】');
                            player.damage(trigger.num); // 受到等量伤害

                            // 切换状态
                            player.storage.ms_tiandu = true;
                            player.markSkill('ms_tiandu');
                        }
                    },

                    // 修复版形态②：被杀回血
                    "ms_tiandu_effect2": {
                        trigger: { target: "useCardToTargeted" }, // 【核心修复】：自身作为目标被指定，必须用 target
                        forced: true,
                        filter: function (event, player) {
                            if (!player.storage.ms_tiandu) return false;
                            return event.card.name === 'sha'; // 必须是杀
                        },
                        content: function () {
                            player.logSkill('ms_tiandu');
                            game.log(player, '成为了【杀】的目标，触发【天妒】并回复体力');
                            player.recover(1);

                            // 切换状态
                            player.storage.ms_tiandu = false;
                            player.markSkill('ms_tiandu');
                        }
                    },

                    // --- 遗计 (纯原生源码剥离独立版) ---
                    "ms_yiji": {
                        audio: "reyiji", // 顺便完美借用原版界郭嘉的语音
                        trigger: {
                            player: "damageEnd",
                        },
                        frequent: true,
                        filter: function (event) {
                            return (event.num > 0);
                        },
                        content: function () {
                            "step 0"
                            event.count = trigger.num; // 记录受到的伤害点数

                            "step 1"
                            player.draw(2); // 摸两张牌
                            event.count--;
                            if (_status.connectMode) game.broadcastAll(function () { _status.noclearcountdown = true });
                            event.given_map = {};
                            event.num = 2; // 准备分配两张牌

                            "step 2"
                            // 开启卡牌和目标的双重选择面板
                            player.chooseCardTarget({
                                filterCard: function (card) {
                                    // 【优化】：标签改为独立扩展标签，防止多角色同局时出现分配混乱
                                    return get.itemtype(card) == 'card' && !card.hasGaintag('ms_yiji_tag');
                                },
                                filterTarget: lib.filter.notMe,
                                selectCard: [1, event.num],
                                prompt: '请选择要分配的卡牌和目标',
                                ai1: function (card) {
                                    if (!ui.selected.cards.length) return 1;
                                    return 0;
                                },
                                ai2: function (target) {
                                    var player = _status.event.player, card = ui.selected.cards[0];
                                    var val = target.getUseValue(card);
                                    if (val > 0) return val * get.attitude(player, target) * 2;
                                    return get.value(card, target) * get.attitude(player, target);
                                },
                            });

                            "step 3"
                            if (result.bool) {
                                var res = result.cards, target = result.targets[0].playerid;
                                player.addGaintag(res, 'ms_yiji_tag');
                                event.num -= res.length;
                                if (!event.given_map[target]) event.given_map[target] = [];
                                event.given_map[target].addArray(res);
                                if (event.num > 0) event.goto(2); // 如果还有额度没分完，返回 step 2 继续分
                            }
                            else if (event.num == 2) {
                                if (_status.connectMode) {
                                    game.broadcastAll(function () { delete _status.noclearcountdown; game.stopCountChoose() });
                                }
                                event.goto(5); // 一张都不分，直接跳去判定剩余伤害
                            }

                            "step 4"
                            if (_status.connectMode) {
                                game.broadcastAll(function () { delete _status.noclearcountdown; game.stopCountChoose() });
                            }
                            var map = [], cards = [];
                            for (var i in event.given_map) {
                                var source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
                                player.line(source, 'green');
                                if (player !== source && (get.mode() !== 'identity' || player.identity !== 'nei')) player.addExpose(0.18);
                                map.push([source, event.given_map[i]]);
                                cards.addArray(event.given_map[i]);
                            }
                            // 异步执行多目标一键分牌特效
                            game.loseAsync({
                                gain_list: map,
                                player: player,
                                cards: cards,
                                giver: player,
                                animate: 'giveAuto',
                            }).setContent('gaincardMultiple');

                            "step 5"
                            // 【核心修复】：原版的 new_reyiji 强行纠正为濑津美本尊的 ms_yiji
                            if (event.count > 0 && player.hasSkill('ms_yiji')) {
                                player.chooseBool(get.prompt2('ms_yiji'));
                            }
                            else event.finish();

                            "step 6"
                            if (result.bool) {
                                // 【核心修复】：修复多点伤害时连续触发的技能牌亮起动态
                                player.logSkill('ms_yiji');
                                event.goto(1); // 还有伤害没结算完，跳回 step 1 接着摸二分二
                            }
                        },
                        ai: {
                            maixie: true,
                            "maixie_hp": true,
                            result: {
                                effect: function (card, player, target) {
                                    if (get.tag(card, 'damage')) {
                                        if (player.hasSkillTag('jueqing', false, target)) return [1, -2];
                                        if (!target.hasFriend()) return;
                                        var num = 1;
                                        if (get.attitude(player, target) > 0) {
                                            if (player.needsToDiscard()) num = 0.7;
                                            else num = 0.5;
                                        }
                                        if (player.hp >= 4) return [1, num * 2];
                                        if (target.hp == 3) return [1, num * 1.5];
                                        if (target.hp == 2) return [1, num * 0.5];
                                    }
                                },
                            },
                            threaten: 0.6,
                        }
                    },

                    // ================= 高岛柘榴的技能代码 =================

                    // --- 2. 引狼 (使命技) ---
                    "ms_yinlang": {
                        unique: true,
                        mark: true,
                        forced: true,
                        marktext: "命",
                        intro: {
                            content: function (storage, player) {
                                if (player.storage.ms_yinlang_success) return "【使命成功】：咒杀已进化，祸始终极封锁已生效。";
                                return "【使命技】：准备阶段令一人得“戾气”。若控场使带“戾气”人数达活人总数一半，则使命成功。";
                            }
                        },
                        trigger: { player: "phaseZhunbeiBegin" },
                        filter: function (event, player) {
                            return game.hasPlayer(function (current) {
                                return !current.hasMark('ms_liqi');
                            });
                        },
                        content: function () {
                            "step 0"
                            // 【核心修改2】：加入目标过滤函数，在选人面板上强制变灰/禁止选择已经有标记的人
                            player.chooseTarget(
                                '引狼：请选择一名角色获得“戾气”标记',
                                function (card, player, target) {
                                    // 只有没有“戾气”标记的角色才能成为合法目标
                                    return !target.hasMark('ms_liqi');
                                },
                                true
                            ).set('ai', function (target) {
                                // AI 策略优化：优先给敌人塞标记，没有敌人的话随便选一个
                                return get.attitude(_status.event.player, target) < 0 ? 1 : 0.1;
                            });
                            "step 1"
                            if (result.bool) {
                                var target = result.targets[0];
                                // 【核心修复2】：判断如果没有戾气标记，才进行添加，防止叠加显示（如变成2、3）
                                if (!target.hasMark('ms_liqi')) {
                                    target.addMark('ms_liqi', 1);
                                    game.log(target, '被植入了', '#r戾气', '标记');
                                }
                            }
                            "step 2"
                            if (!player.storage.ms_yinlang_success) {
                                var liqiPeople = game.countPlayer(function (current) {
                                    return current.hasMark('ms_liqi');
                                });
                                if (liqiPeople >= Math.ceil(game.countPlayer() / 2)) { // 保险起见加了向上取整
                                    player.storage.ms_yinlang_success = true;
                                    player.popup('使命成功', 'gold');
                                    game.log(player, '【引狼】使命成功！');
                                    player.storage.ms_zhousha_gai = true;

                                    game.ms_huoshi_active = true;
                                    game.addGlobalSkill('ms_huoshi_prohibit');
                                    game.print('【引狼】激增！提前开启【祸始】的绝境封锁：全场严禁使用桃和响应牌！');

                                    var quotes = [
                                        "七二零快乐！",
                                        "鼓足勇气，飞吧！",
                                        "回归天空！"
                                    ];
                                    var text = quotes.randomGet();
                                    if (lib.config.show_banzer !== false) {
                                        var div = ui.create.div(ui.window);
                                        // 颜色使用 #ffd700 (金色)，搭配红黑发光阴影，契合使命成功与危险降临
                                        div.style.cssText = 'position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); z-index:1000; pointer-events:none; font-size:32px; font-family:"STXinwei","华文新魏",serif; color:#ffd700; text-shadow:0 0 10px #000, 0 0 20px #000, 0 0 30px #ff0000; opacity:0; transition:all 0.5s ease-out; white-space:nowrap;';
                                        div.innerHTML = '<b>【使命成功】</b> ' + text;

                                        setTimeout(function () {
                                            div.style.opacity = '1';
                                            div.style.transform = 'translate(-50%, -60%)';
                                        }, 50);
                                        setTimeout(function () {
                                            div.style.opacity = '0';
                                            div.style.transform = 'translate(-50%, -70%)';
                                        }, 2000);
                                        setTimeout(function () {
                                            div.delete();
                                        }, 2500);
                                    }
                                    player.say(text);
                                    game.log(player, '：“<font color=yellow>' + text + '</font>”');

                                    // 也可以额外加上无名杀自带的立绘闪烁特效，会更帅气
                                    player.$skill('引狼', null, 'gold');
                                }
                            }
                        }
                    },

                    // --- 1. 祸始 (本体，死亡触发选人) ---
                    "ms_huoshi": {
                        audio: 2,
                        forced: true,
                        forceDie: true,
                        trigger: { player: "dieAfter" },
                        filter: function (event, player) {
                            // 【核心修改】：如果使命技“引狼”已经成功（或祸始已在全局激活），则高岛死亡时不再触发此技能
                            if (player.storage.ms_yinlang_success || game.ms_huoshi_active) return false;
                            return true;
                        },
                        content: function () {
                            "step 0"
                            player.chooseTarget('祸始：请选择一名角色，其下个回合开始后将开启全局封锁', true).set('ai', function (target) {
                                return 1;
                            });
                            "step 1"
                            if (result.bool && result.targets.length > 0) {
                                var target = result.targets[0];
                                player.line(target, 'fire');
                                game.log(player, '将【祸始】的诅咒寄托在了', target, '身上！');

                                target.addMark('ms_huoshi_mark', 1);
                                target.addSkill('ms_huoshi_trigger');
                            }
                        }
                    },

                    // --- 2. 祸始的诅咒标记（UI显示用） ---
                    "ms_huoshi_mark": {
                        name: "祸始",
                        intro: {
                            content: "回合开始后，将开启全局绝境封锁（本局游戏所有角色不能再使用【桃】【闪】【无懈可击】）。"
                        }
                    },

                    // --- 3. 祸始·触发（寄生隐藏技，带大字幕特效） ---
                    "ms_huoshi_trigger": {
                        charlotte: true, // 隐藏技能
                        forced: true,
                        trigger: { player: "phaseBegin" },
                        content: function () {
                            // 卸磨杀驴，移除自身技能和标记
                            player.removeSkill('ms_huoshi_trigger');
                            player.removeMark('ms_huoshi_mark');

                            // 检测是否已经被【引狼】等其他途径提前开启过封锁
                            if (!game.ms_huoshi_active) {
                                game.ms_huoshi_active = true;
                                game.addGlobalSkill('ms_huoshi_prohibit'); // 激活全局封锁光环

                                // --- 【中央字幕与特效系统】 ---
                                var quotes = [
                                    "绝境已至，无可逃避！",
                                    "祸始降临，万劫不复！"
                                ];
                                var text = quotes.randomGet();
                                if (lib.config.show_banzer !== false) {
                                    var div = ui.create.div(ui.window);
                                    div.style.cssText = 'position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); z-index:1000; pointer-events:none; font-size:32px; font-family:"STXinwei","华文新魏",serif; color:#ff3333; text-shadow:0 0 10px #000, 0 0 20px #000, 0 0 30px #ff0000; opacity:0; transition:all 0.5s ease-out; white-space:nowrap;';
                                    div.innerHTML = '<b>【祸始】</b> ' + text;

                                    setTimeout(function () {
                                        div.style.opacity = '1';
                                        div.style.transform = 'translate(-50%, -60%)';
                                    }, 50);
                                    setTimeout(function () {
                                        div.style.opacity = '0';
                                        div.style.transform = 'translate(-50%, -70%)';
                                    }, 2000);
                                    setTimeout(function () {
                                        div.delete();
                                    }, 2500);
                                }
                                player.say(text);
                                game.log(player, '：“<font color=red>' + text + '</font>”');
                                // --- 【特效结束】 ---

                                // 系统常规日志播报与头像飘字
                                game.broadcastAll(function () {
                                    var str = '【祸始】绝境封锁已开启：本局游戏所有角色不能再使用【桃】【闪】【无懈可击】！';
                                    game.print('#r' + str);
                                });
                                player.popup('祸始降临', 'fire');
                            }
                        }
                    },

                    // --- 4. 祸始·封锁（全局禁卡核心逻辑） ---
                    "ms_huoshi_prohibit": {
                        charlotte: true, // 系统级控制技，不在技能栏显示
                        mod: {
                            // 禁止主动使用
                            cardUsable: function (card, player) {
                                if (card.name === 'tao' || card.name === 'shan' || card.name === 'wuxie') return false;
                            },
                            // 禁止响应（打出）
                            cardRespondable: function (card, player) {
                                if (card.name === 'tao' || card.name === 'shan' || card.name === 'wuxie') return false;
                            },
                            // 禁止濒死求桃
                            cardSavable: function (card, player) {
                                if (card.name === 'tao') return false;
                            },
                            // 全面禁用卡牌点选
                            cardEnabled: function (card, player) {
                                if (card.name === 'tao' || card.name === 'shan' || card.name === 'wuxie') return false;
                            }
                        }
                    },

                    // --- 3. 咒杀 (双形态卡牌转化重构) ---
                    "ms_zhousha": {
                        trigger: { global: "useCardBefore" },
                        filter: function (event, player) {
                            if (!event.player.hasMark('ms_liqi')) return false;
                            if (event.card.name === 'shan' || event.card.name === 'wuxie') return false;

                            // 【核心修复3】：使用 game.phaseNumber 精准判断回合是否更迭
                            if (player.storage.ms_zhousha_phase !== game.phaseNumber) {
                                player.storage.ms_zhousha_phase = game.phaseNumber;
                                player.storage.ms_zhousha_used_targets = []; // 只要进入新回合，立刻清空本回合记录
                            }

                            // 判断这名角色在本回合内是否已经被发动过
                            if (player.storage.ms_zhousha_used_targets.contains(event.player)) return false;

                            return true;
                        },
                        content: function () {
                            "step 0"
                            var is_gai = player.storage.ms_zhousha_gai;
                            var promptStr = is_gai ?
                                '是否发动【咒杀】？将 ' + get.translation(trigger.player) + ' 的 [' + get.translation(trigger.card) + '] 转化为【决斗】并【重选任意目标】？' :
                                '是否发动【咒杀】？将 ' + get.translation(trigger.player) + ' 的 [' + get.translation(trigger.card) + '] 转化为【决斗】？';

                            player.chooseBool(promptStr).set('ai', function () {
                                return get.attitude(_status.event.player, trigger.player) < 0;
                            });
                            "step 1"
                            if (result.bool) {
                                // 记录该目标在本回合已被咒杀
                                if (player.storage.ms_zhousha_phase !== game.phaseNumber) {
                                    player.storage.ms_zhousha_phase = game.phaseNumber;
                                    player.storage.ms_zhousha_used_targets = [];
                                }
                                player.storage.ms_zhousha_used_targets.push(trigger.player);

                                player.logSkill('ms_zhousha');
                                trigger.card = { name: 'juedou' };

                                if (player.storage.ms_zhousha_gai) {
                                    player.chooseTarget('咒杀（修改后）：请选择任意多名角色作为此【决斗】的新目标', [1, Infinity], function (card, player, target) {
                                        return target !== _status.event.triggerPlayer;
                                    }).set('triggerPlayer', trigger.player).set('ai', function (target) {
                                        return -get.attitude(_status.event.player, target);
                                    });
                                } else {
                                    event.finish();
                                }
                            } else {
                                event.finish();
                            }
                            "step 2"
                            if (result && result.bool && result.targets) {
                                trigger.targets = result.targets;
                                game.log(player, '重置了目标，将决斗引向：', result.targets);
                            }
                        }
                    },

                    // --- 4. 戾气标记显示修饰 ---
                    "ms_liqi": {
                        mark: true,
                        marktext: "戾",
                        intro: {
                            content: "戾气缠身。此角色使用牌时，高岛柘榴可将其转化为【决斗】。"
                        }
                    },

                    // ================= 古手梨花的技能代码 =================


                    // --- 1. 神道 (移除摸牌效果版) ---
                    "ms_shendao": {
                        trigger: { global: "judge" },
                        filter: function (event, player) {
                            return player.countCards('he') > 0;
                        },
                        content: function () {
                            "step 0"
                            player.chooseCard('he', '是否发动【神道】替换 ' + get.translation(trigger.player) + ' 的判定牌？').set('ai', function (card) {
                                // 移除了摸牌效果，AI 直接给基础权重即可（如需更智能的改判可参考张角/司马懿AI）
                                return 1;
                            });
                            "step 1"
                            if (result.bool) {
                                // 携带 'noOrdering' 参数安全打出，同时触发雷击②的 respond 监听
                                player.respond(result.cards, 'highlight', 'ms_shendao', 'noOrdering');
                            } else {
                                event.finish();
                            }
                            "step 2"
                            if (result.bool) {
                                // 完美收回原判定牌
                                var old_card = trigger.player.judging[0];
                                var new_card = result.cards[0];

                                player.$gain2(old_card);
                                player.gain(old_card);

                                // 正式替换判定流中的卡牌
                                trigger.player.judging[0] = new_card;
                                trigger.orderingCards.addArray(result.cards);

                                game.log(trigger.player, '的判定牌改为', new_card);
                            }
                            "step 3"
                            if (result.bool) {
                                game.delay(2);
                            }
                        }
                    },

                    // --- 2. 雷击 (核心主控) ---
                    "ms_leiji": {
                        unique: true,
                        group: ["ms_leiji_effect1", "ms_leiji_effect2"]
                    },

                    // 雷击子效果①：判定生效后的追击
                    "ms_leiji_effect1": {
                        trigger: { player: "judgeAfter" }, // 因为神道成功修改了 judging 数组，这里的 judgeAfter 终于能读到正确的 result 了
                        filter: function (event, player) {
                            if (!event.result) return false;
                            var suit = event.result.suit;
                            return suit === 'spade' || suit === 'club';
                        },
                        prompt: function (event, player) {
                            if (event.result.suit === 'spade') return '是否发动【雷击】对一名角色造成1点伤害？';
                            return '是否发动【雷击】弃置一名角色一张牌？';
                        },
                        check: function (event, player) {
                            return true;
                        },
                        content: function () {
                            "step 0"
                            event.suit = trigger.result.suit;

                            if (event.suit === 'spade') {
                                player.chooseTarget('雷击：请选择一名角色对其造成1点伤害', true).set('ai', function (target) {
                                    return get.damageEffect(target, player, player);
                                });
                            } else if (event.suit === 'club') {
                                player.chooseTarget('雷击：请选择一名角色弃置其一张牌', true).set('ai', function (target) {
                                    return -get.attitude(player, target);
                                });
                            }
                            "step 1"
                            if (result.bool) {
                                var target = result.targets[0];
                                player.logSkill('ms_leiji');

                                if (event.suit === 'spade') {
                                    target.damage();
                                } else if (event.suit === 'club') {
                                    player.discardPlayerCard(target, 'he', true);
                                }
                            }
                        }
                    },

                    // 雷击子效果②：使用/打出基本牌引发判定
                    "ms_leiji_effect2": {
                        trigger: { player: ["useCard", "respond"] },
                        filter: function (event, player) {
                            return event.card && get.type(event.card) === 'basic';
                        },
                        prompt: '是否发动【雷击】进行一次判定？',
                        check: function (event, player) {
                            return true;
                        },
                        content: function () {
                            player.judge();
                        }
                    },


                    // ================= 菜奶花的技能代码 =================

                    // --- 1. 泥塑 (全新机制，核心重构修复版) ---
                    "ms_nisu": {
                        // 【新增】：AI 控制逻辑（决定是否要防这刀）
                        check: function (event, player) {
                            // 极大尺度：绝对不替讨厌的敌人挡刀，只有当受伤的是队友或自己时才启动技能
                            return get.attitude(player, event.player) > 0;
                        },
                        mark: true,
                        marktext: "玉",
                        intro: {
                            name: "泥塑标记",
                            content: function (storage, player) {
                                var str = "";
                                // 替换为更稳定的 for 循环以避免 UI 渲染中断
                                for (var i = 0; i < game.players.length; i++) {
                                    var current = game.players[i];
                                    var marks = current.storage.ms_nisu_marks;

                                    if (marks && marks.length > 0) {
                                        str += get.translation(current) + "：" + marks.join("、") + "<br>";
                                    }
                                }

                                if (!str.length) str = "暂无标记勾玉";
                                return str;
                            }
                        },
                        trigger: {
                            player: "damageBegin1" // 调整到伤害发生的最早阶段，用于拦截
                        },
                        priority: 10,
                        filter: function (event, player) {
                            // 场上必须存在至少一名拥有充盈勾玉的角色（当前体力 >= 标记值）
                            return game.hasPlayer(function (current) {
                                var marks = current.storage.ms_nisu_marks;
                                if (!marks || !marks.length) return false;
                                return marks.some(mark => current.hp >= mark);
                            });
                        },
                        prompt: "是否消耗一名角色的充盈勾玉（令其失去1点体力），来防止本次受到的伤害？",
                        content: function () {
                            "step 0"
                            player.chooseTarget('泥塑：请选择一名拥有充盈勾玉的角色', function (card, player, target) {
                                var marks = target.storage.ms_nisu_marks;
                                if (!marks || !marks.length) return false;
                                return marks.some(mark => target.hp >= mark);
                            }, true).set('ai', function (target) {
                                var player = _status.event.player;
                                var att = get.attitude(player, target);
                                // 【大尺度 AI 战术：极致吸血寄生】
                                // 战术 A：能够让敌人流失体力来替我们挡刀，这是无本万利的顶级收益，仇恨值拉满（30）！
                                if (att < 0) return 30;
                                // 战术 B：如果实在没有敌人可吸，迫不得已选队友，则优先选血量最健康的队友来承担
                                if (att > 0) return target.hp * 5;
                                return 0;
                            });

                            "step 1"
                            if (result.bool) {
                                var target = result.targets[0];
                                player.logSkill('ms_nisu', target);
                                // 令其失去体力，随后取消伤害
                                target.loseHp();
                                trigger.cancel();
                            }
                        },
                        group: [
                            "ms_nisu_init",
                            "ms_nisu_update"
                        ]
                    },

                    "ms_nisu_init": {
                        trigger: {
                            global: "gameStart"
                        },
                        forced: true,
                        popup: false,
                        content: function () {
                            // 【核心新增】赋予 storage 初始值并主动唤醒标记面板
                            player.storage.ms_nisu = true;
                            player.markSkill("ms_nisu");

                            game.players.forEach(function (current) {
                                if (!current.storage.ms_nisu_marks) {
                                    current.storage.ms_nisu_marks = [];
                                }

                                if (current.hp > 0) {
                                    current.storage.ms_nisu_marks.push(current.hp);
                                }

                                current.storage.ms_nisu_prevHp = current.hp;
                                current.storage.ms_nisu_prevMaxHp = current.maxHp;
                            });
                        }
                    },

                    "ms_nisu_update": {
                        trigger: {
                            global: [
                                "changeHpAfter",
                                "loseHpAfter",
                                "recoverAfter",
                                "gainMaxHpAfter",
                                "loseMaxHpAfter"
                            ]
                        },
                        forced: true,
                        popup: false,
                        filter: function (event, player) {
                            return event.player && event.player.storage;
                        },
                        content: function () {

                            var target = trigger.player;

                            if (!target.storage.ms_nisu_marks) {
                                target.storage.ms_nisu_marks = [];
                            }

                            var marks = target.storage.ms_nisu_marks;

                            var oldHp = target.storage.ms_nisu_prevHp;
                            var oldMaxHp = target.storage.ms_nisu_prevMaxHp;

                            if (typeof oldHp != "number") oldHp = target.hp;
                            if (typeof oldMaxHp != "number") oldMaxHp = target.maxHp;

                            var newHp = target.hp;
                            var newMaxHp = target.maxHp;

                            var drawNum = 0;
                            var addMarks = [];

                            for (var i = 0; i < marks.length; i++) {

                                var mark = marks[i];

                                var oldFull = (
                                    mark <= oldMaxHp &&
                                    oldHp >= mark
                                );

                                var newFull = (
                                    mark <= newMaxHp &&
                                    newHp >= mark
                                );

                                // 充盈→亏损
                                if (oldFull && !newFull) {
                                    drawNum++;
                                }

                                // 亏损→充盈
                                else if (!oldFull && newFull) {

                                    var addMark = 0;

                                    for (var j = newHp; j >= 1; j--) {

                                        if (!marks.includes(j) &&
                                            !addMarks.includes(j)) {

                                            addMark = j;
                                            break;
                                        }
                                    }

                                    if (addMark) {
                                        addMarks.push(addMark);
                                    }

                                }
                            }

                            if (drawNum > 0) {
                                player.draw(drawNum);
                            }

                            if (addMarks.length) {

                                marks.addArray(addMarks);

                                target.popup("泥塑");
                                player.line(target, "green");

                            }

                            marks.sort(function (a, b) {
                                return a - b;
                            });

                            target.storage.ms_nisu_prevHp = target.hp;
                            target.storage.ms_nisu_prevMaxHp = target.maxHp;

                            // 【核心新增】状态变动后，通知引擎刷新“泥塑”的标记显示
                            player.markSkill("ms_nisu");
                        }
                    },

                    // --- 2. 夺羁 (代码内强行注入翻译版) ---
                    "ms_duoji": {
                        // 【AI 控制逻辑优化】：预检查全局目标，无有效收益时返回 0，绝不误触死循环！
                        ai: {
                            order: 9,
                            result: {
                                player: function (player) {
                                    // 检查 效果3：是否存在可斩杀的敌人（仇恨极高）
                                    if (player.storage.ms_duoji_eff3 !== true) {
                                        var canKillEnemy = game.hasPlayer(function (p) {
                                            return p.storage.ms_nisu_marks && p.storage.ms_nisu_marks.length >= p.maxHp && get.attitude(player, p) < 0;
                                        });
                                        if (canKillEnemy) return 100; // 极高斩杀欲望！
                                    }

                                    // 检查 效果1：失去1血摸2牌（1血敌人必杀，或高血量队友过牌）
                                    if (player.storage.ms_duoji_eff1 !== true) {
                                        var canEff1 = game.hasPlayer(function (p) {
                                            var att = get.attitude(player, p);
                                            return (att < 0 && p.hp === 1) || (att > 0 && p.hp >= 3);
                                        });
                                        if (canEff1) return 50;
                                    }

                                    // 检查 效果2：弃2牌回1血（救助残血队友，或剥离满血敌人装备/手牌）
                                    if (player.storage.ms_duoji_eff2 !== true) {
                                        var canEff2 = game.hasPlayer(function (p) {
                                            var att = get.attitude(player, p);
                                            return (att > 0 && p.hp <= 2 && p.countCards('he') >= 2) ||
                                                (att < 0 && p.hp === p.maxHp && p.countCards('he') >= 2);
                                        });
                                        if (canEff2) return 40;
                                    }

                                    // 如果三个选项都无法产生有效收益/没有合适目标，返回 0，AI 将绝对不会按技能按钮！
                                    return 0;
                                }
                            }
                        },
                        enable: "phaseUse",
                        filter: function (event, player) {
                            return player.storage.ms_duoji_eff1 !== true ||
                                player.storage.ms_duoji_eff2 !== true ||
                                player.storage.ms_duoji_eff3 !== true;
                        },
                        content: function () {
                            "step 0"
                            // 【核心修复】：直接把翻译强行写入无名杀引擎底层字典，无视任何缓存！
                            lib.translate.ms_duoji_eff1 = "失去1体力并摸2牌";
                            lib.translate.ms_duoji_eff2 = "弃置2张牌并回复1体力";
                            lib.translate.ms_duoji_eff3 = "失去所有体力";

                            var list = [];
                            if (player.storage.ms_duoji_eff1 !== true) list.push('ms_duoji_eff1');
                            if (player.storage.ms_duoji_eff2 !== true) list.push('ms_duoji_eff2');

                            var canKill = game.hasPlayer(function (p) {
                                return p.storage.ms_nisu_marks && p.storage.ms_nisu_marks.length >= p.maxHp;
                            });
                            if (player.storage.ms_duoji_eff3 !== true && canKill) list.push('ms_duoji_eff3');
                            list.push('cancel');

                            player.chooseControl(list).set('prompt', '夺羁：请选择要执行的效果').set('ai', function () {
                                var player = _status.event.player;
                                var list = _status.event.controls;

                                // 【极大尺度 AI 战术分流】
                                // 战术 A：如果存在满足条件的敌方斩杀线，绝对优先处决（极高优先级）！
                                if (list.includes('ms_duoji_eff3')) {
                                    var canKillEnemy = game.hasPlayer(function (p) {
                                        return p.storage.ms_nisu_marks && p.storage.ms_nisu_marks.length >= p.maxHp && get.attitude(player, p) < 0;
                                    });
                                    if (canKillEnemy) return 'ms_duoji_eff3';
                                }

                                // 战术 B：评估 1 效果（斩杀 1 血敌人，或高血量队友过牌）
                                if (list.includes('ms_duoji_eff1')) {
                                    var hasEff1Target = game.hasPlayer(function (p) {
                                        var att = get.attitude(player, p);
                                        return (att < 0 && p.hp === 1) || (att > 0 && p.hp >= 3);
                                    });
                                    if (hasEff1Target) return 'ms_duoji_eff1';
                                }

                                // 战术 C：评估 2 效果（救助残血队友，或拔掉满血敌人神装/手牌）
                                if (list.includes('ms_duoji_eff2')) {
                                    var hasEff2Target = game.hasPlayer(function (p) {
                                        var att = get.attitude(player, p);
                                        return (att > 0 && p.hp <= 2 && p.countCards('he') >= 2) ||
                                            (att < 0 && p.hp === p.maxHp && p.countCards('he') >= 2);
                                    });
                                    if (hasEff2Target) return 'ms_duoji_eff2';
                                }

                                // 若无任何利好情况，直接取消
                                return 'cancel';
                            });

                            "step 1"
                            if (result.control == 'cancel') {
                                event.finish();
                            } else {
                                event.effectType = result.control;
                                player.storage[result.control] = true;

                                var prompt = '夺羁：请选择一名角色';
                                if (event.effectType == 'ms_duoji_eff3') prompt = '夺羁：请选择一名所有勾玉均被标记的角色使其失去所有体力';

                                player.chooseTarget(prompt, function (card, player, target) {
                                    if (event.effectType == 'ms_duoji_eff3') {
                                        return target.storage.ms_nisu_marks && target.storage.ms_nisu_marks.length >= target.maxHp;
                                    }
                                    return true;
                                }, true).set('ai', function (target) {
                                    var player = _status.event.player;
                                    var att = get.attitude(player, target);
                                    var eff = _status.event.effectType;

                                    // 【极大尺度目标锁定机制】
                                    if (eff === 'ms_duoji_eff3') {
                                        // 效果3：清空体力！极高仇恨与敌我分明（敌人 +100，队友 -100）
                                        if (att < 0) return 100;
                                        return -100;
                                    } else if (eff === 'ms_duoji_eff1') {
                                        // 效果1：失去1体力摸2牌。
                                        // 敌人只剩 1 血，直接流失体力斩杀，极大收益（80）
                                        if (att < 0 && target.hp === 1) return 80;
                                        // 队友血量很健康（>=3），用1血换2牌（40）
                                        if (att > 0 && target.hp >= 3) return 40;
                                        return 0;
                                    } else if (eff === 'ms_duoji_eff2') {
                                        // 效果2：弃置2牌回复1体力。
                                        // 救助残血队友（60）
                                        if (att > 0 && target.hp <= 2 && target.countCards('he') >= 2) return 60;
                                        // 剥离满血敌人手牌/装备（35）
                                        if (att < 0 && target.hp === target.maxHp && target.countCards('he') >= 2) return 35;
                                        return 0;
                                    }
                                    return 0;
                                });
                            }

                            "step 2"
                            if (result.bool) {
                                var target = result.targets[0];
                                event.duoji_target = target;

                                if (event.effectType == 'ms_duoji_eff1') {
                                    target.loseHp();
                                    target.draw(2);
                                } else if (event.effectType == 'ms_duoji_eff2') {
                                    target.chooseToDiscard(2, true, 'he').set('ai', function (card) {
                                        return 10 - get.value(card);
                                    });
                                } else if (event.effectType == 'ms_duoji_eff3') {
                                    target.loseHp(target.hp);
                                }
                            }

                            "step 3"
                            if (event.effectType == 'ms_duoji_eff2' && result.bool && event.duoji_target) {
                                event.duoji_target.recover();
                            }
                        },
                        group: "ms_duoji_clear"
                    },

                    "ms_duoji_clear": {
                        trigger: { player: "phaseAfter" },
                        silent: true,
                        charlotte: true,
                        content: function () {
                            delete player.storage.ms_duoji_eff1;
                            delete player.storage.ms_duoji_eff2;
                            delete player.storage.ms_duoji_eff3;
                        }
                    },

                    // ================= 九条都的技能代码 =================

                    // --- 1. 夺锐 (无代价版) ---
                    "ms_duorui": {
                        trigger: { source: "damage" },
                        filter: function (event, player) {
                            // 过滤：目标必须存活，且不能是自己
                            if (event.player == player || !event.player.isAlive()) return false;

                            // 过滤：目标必须至少拥有一个印在“武将牌上”的技能
                            var target = event.player;
                            var skills = target.getSkills(null, false, false).filter(function (s) {
                                var info = lib.skill[s];
                                if (!info || info.equip || info.charlotte || info.hidden) return false;
                                // 严格检索是否是武将牌上的原始技能
                                var isCharSkill = false;
                                var names = [target.name, target.name1, target.name2];
                                for (var j = 0; j < names.length; j++) {
                                    if (names[j] && lib.character[names[j]] && lib.character[names[j]][3].includes(s)) {
                                        isCharSkill = true;
                                        break;
                                    }
                                }
                                return isCharSkill;
                            });
                            return skills.length > 0;
                        },
                        content: function () {
                            "step 0"
                            var target = trigger.player;
                            // 提取目标技能
                            var skills = target.getSkills(null, false, false).filter(function (s) {
                                var info = lib.skill[s];
                                if (!info || info.equip || info.charlotte || info.hidden) return false;
                                var isCharSkill = false;
                                var names = [target.name, target.name1, target.name2];
                                for (var j = 0; j < names.length; j++) {
                                    if (names[j] && lib.character[names[j]] && lib.character[names[j]][3].includes(s)) {
                                        isCharSkill = true;
                                        break;
                                    }
                                }
                                return isCharSkill;
                            });

                            // 加入取消按钮，防止强制发动
                            skills.push('cancel');

                            player.chooseControl(skills).set('prompt', '夺锐：你可以夺取【' + get.translation(target) + '】的一个技能').set('ai', function () {
                                return skills[0]; // AI 默认夺取第一个有效技能
                            });

                            event.duorui_target = target;

                            "step 1"
                            if (result.control && result.control != 'cancel') {
                                var s = result.control;
                                var target = event.duorui_target;

                                player.logSkill('ms_duorui', target);

                                // 夺取技能逻辑
                                target.removeSkill(s);
                                player.addSkill(s);

                                // 启动隐藏追踪器
                                player.addSkill('ms_duorui_tracker');
                                if (!player.storage.ms_duorui_tracker) player.storage.ms_duorui_tracker = [];

                                // 核心算法：判断当前是否是目标的当前回合
                                var isCurrentTurn = (_status.currentPhase == target);
                                player.storage.ms_duorui_tracker.push({
                                    target: target,
                                    skill: s,
                                    isNextTurn: !isCurrentTurn
                                });

                                game.log(player, '夺取了', target, '的技能', '#g【' + get.translation(s) + '】');
                            }
                        }
                    },

                    // --- 夺锐 (隐藏监听器)：用于归还技能 ---
                    "ms_duorui_tracker": {
                        trigger: { global: ["phaseEnd", "dieBegin"] },
                        charlotte: true,
                        forced: true,
                        popup: false,
                        filter: function (event, player, name) {
                            if (!player.storage.ms_duorui_tracker || player.storage.ms_duorui_tracker.length == 0) return false;
                            if (name == 'dieBegin' && event.player == player) return true; // 九条都自己要死了
                            // 检查是否有目标的阶段结束或死亡
                            for (var i = 0; i < player.storage.ms_duorui_tracker.length; i++) {
                                if (player.storage.ms_duorui_tracker[i].target == event.player) return true;
                            }
                            return false;
                        },
                        content: function () {
                            var list = player.storage.ms_duorui_tracker;
                            var newList = [];

                            // 情况 A：九条都自己死亡，强制将所有夺来的技能归还给对应的目标
                            if (trigger.name == 'dieBegin' && trigger.player == player) {
                                for (var i = 0; i < list.length; i++) {
                                    var item = list[i];
                                    if (item.target && item.target.isAlive()) {
                                        item.target.addSkill(item.skill);
                                        game.log(item.target, '恢复了技能', '#g【' + get.translation(item.skill) + '】');
                                    }
                                }
                                player.storage.ms_duorui_tracker = [];
                                player.removeSkill('ms_duorui_tracker');
                                return;
                            }

                            // 情况 B：目标回合结束或目标死亡
                            for (var i = 0; i < list.length; i++) {
                                var item = list[i];
                                if (item.target == trigger.player) {
                                    if (trigger.name == 'dieBegin') {
                                        // 如果目标死亡了，九条都立刻失去该技能
                                        player.removeSkill(item.skill);
                                        game.log(player, '由于', item.target, '阵亡，失去了技能', '#g【' + get.translation(item.skill) + '】');
                                    } else if (item.isNextTurn) {
                                        // 已经到达了“下回合结束前”的时机，归还技能
                                        item.target.addSkill(item.skill);
                                        player.removeSkill(item.skill);
                                        game.log(item.target, '恢复了技能', '#g【' + get.translation(item.skill) + '】');
                                    } else {
                                        // 还在目标的当前回合（刚被夺走不久），顺延到下回合
                                        item.isNextTurn = true;
                                        newList.push(item);
                                    }
                                } else {
                                    newList.push(item);
                                }
                            }
                            player.storage.ms_duorui_tracker = newList;
                            // 如果没有需要追踪的技能了，移除追踪器
                            if (newList.length == 0) player.removeSkill('ms_duorui_tracker');
                        }
                    },

                    // --- 2. 化石 ---
                    "ms_huashi": {
                        trigger: { player: "damageEnd" },
                        filter: function (event, player) {
                            // 过滤：玩家必须有合法目标可以使用【决斗】
                            return player.hasUseTarget({ name: 'juedou' }, false);
                        },
                        content: function () {
                            "step 0"
                            // 此时让玩家主动去选是否发动、以及【决斗】给谁
                            player.chooseUseTarget('化石：你可以翻面并视为使用一张【决斗】', { name: 'juedou' }, false).set('ai1', function (card, target) {
                                var player = _status.event.player;
                                // AI逻辑：如果自己已经翻面了，那非常乐意发动（正好翻回来）；如果处于正面，一般不发动，除非有巨大收益
                                if (player.isTurnedOver()) return get.effect(target, { name: 'juedou' }, player, player);
                                return 0;
                            });

                            "step 1"
                            // 只要上一步没有点击“取消”并且选择了目标
                            if (result.bool) {
                                player.logSkill('ms_huashi');
                                player.turnOver();
                            }
                        }
                    },

                    // ================= 柴门环的技能代码 =================

                    // --- 1. 牛论 (精准判定版) ---
                    "ms_niulun": {
                        trigger: { global: "useCard1" },
                        frequent: true,
                        filter: function (event, player) {
                            // 如果是没有实体牌的纯虚拟牌（如技能凭空产生），视为使用了非手牌
                            if (!event.cards || event.cards.length == 0) return true;

                            // 核心修复：读取我们在 useCardBefore 时机打下的精准标记
                            if (event.ms_niulun_isOwnHandcard !== undefined) {
                                return !event.ms_niulun_isOwnHandcard;
                            }

                            // 兜底防错机制（理论上不会触发到这里）
                            for (var i = 0; i < event.cards.length; i++) {
                                if (event.cards[i].original === 'h') return false;
                            }
                            return true;
                        },
                        // 【新增】：AI 控制逻辑（极致白嫖）
                        check: function (event, player) {
                            // 只要有人用了非手牌，摸牌没有任何负面代价，白嫖意愿拉满
                            return 20;
                        },
                        prompt: function (event, player) {
                            return "牛论：【" + get.translation(event.player) + "】使用了非手牌，是否摸一张牌？";
                        },
                        content: function () {
                            player.draw();
                        },
                        // 挂载隐藏的追踪器子技能
                        group: "ms_niulun_tracker"
                    },

                    // --- 牛论 (隐藏追踪器：专治卡牌位置漂移) ---
                    "ms_niulun_tracker": {
                        trigger: { global: "useCardBefore" },
                        forced: true,
                        silent: true,
                        popup: false,
                        filter: function (event, player) {
                            return event.cards && event.cards.length > 0;
                        },
                        content: function () {
                            // 在卡牌被引擎移出原区域前，精确记录它到底是不是使用者自己的手牌
                            trigger.ms_niulun_isOwnHandcard = false;

                            for (var i = 0; i < trigger.cards.length; i++) {
                                var card = trigger.cards[i];
                                // 必须同时满足：1. 在手牌区；2. 主人是当前正在出牌的人
                                if (get.position(card, true) === 'h' && get.owner(card) === trigger.player) {
                                    trigger.ms_niulun_isOwnHandcard = true;
                                    break; // 只要有一张是自己的手牌，就判定为使用了手牌
                                }
                            }
                        }
                    },

                    // ================= 西尔维娅的技能代码 =================

                    // --- 1. 纵横 ---
                    "ms_zongheng": {
                        // 监听卡牌指定目标后的时机
                        trigger: { player: "useCard2" },
                        filter: function (event, player) {
                            // 过滤：必须是基本牌或普通锦囊牌
                            var type = get.type(event.card);
                            if (type !== 'basic' && type !== 'trick') return false;

                            // 过滤：必须原本有目标
                            if (!event.targets || event.targets.length === 0) return false;

                            // 过滤：场上必须存在“非目标角色”才具有发动的意义
                            return game.hasPlayer(function (current) {
                                return !event.targets.includes(current);
                            });
                        },
                        prompt: function (event, player) {
                            return '是否发动【纵横】将【' + get.translation(event.card) + '】的目标改为所有非目标角色？';
                        },
                        check: function (event, player) {
                            // 极致 AI：分别计算原有目标和全新目标的总价值收益，只有当新目标的收益大于旧目标时才发动
                            var old_targets = event.targets;
                            var new_targets = game.filterPlayer(function (current) {
                                return !old_targets.includes(current);
                            });
                            var val1 = 0, val2 = 0;
                            for (var i = 0; i < old_targets.length; i++) {
                                val1 += get.effect(old_targets[i], event.card, player, player);
                            }
                            for (var i = 0; i < new_targets.length; i++) {
                                val2 += get.effect(new_targets[i], event.card, player, player);
                            }
                            // 只要转换后的全场收益（可能是大范围 AOE 斩杀，也可能是全场队友贴 Buff）大于单体收益，就果断重置弹道！
                            return val2 > val1;
                        },
                        content: function () {
                            var old_targets = trigger.targets.slice(0);

                            // 筛选出所有不在此次卡牌目标列表中的角色
                            var new_targets = game.filterPlayer(function (current) {
                                return !old_targets.includes(current);
                            });

                            // 按照座位顺序重新排序，确保结算顺序正确
                            new_targets.sortBySeat();

                            // 播放技能特效并指向新目标
                            player.logSkill('ms_zongheng', new_targets);

                            // 清空原目标并注入新目标
                            trigger.targets.length = 0;
                            trigger.targets.addArray(new_targets);
                        }
                    },

                    // --- 2. 志合 ---
                    "ms_zhihe": {
                        // 【新增】：AI 被动防守与神级威慑逻辑
                        ai: {
                            maixie: true,
                            maixie_hp: true, // 卖血倾向拉满
                            effect: {
                                target: function (card, player, target, current) {
                                    // 【心理战威慑】：当敌人试图对西尔维娅使用伤害牌时，AI会提前计算“同频度”
                                    if (get.tag(card, 'damage') && get.attitude(player, target) < 0) {
                                        var sync_count = 0;
                                        if (player.countCards('h') === target.countCards('h')) sync_count++;
                                        if (player.hp === target.hp) sync_count++;
                                        if (player.countCards('e') === target.countCards('e')) sync_count++;

                                        // 如果同频度极高（2项或全中），此时打西尔维娅等于送她疯狂摸牌。
                                        // 给予敌人极大尺度的恐惧威慑（20），强行劝退敌人的攻击！
                                        if (sync_count >= 2) return [1, 20];

                                        // 如果有1项同频，也会让敌人有些顾忌
                                        if (sync_count === 1) return [1, 5];
                                    }
                                }
                            }
                        },
                        // 监听受到伤害后的时机
                        trigger: { player: "damageEnd" },
                        forced: true,
                        filter: function (event, player) {
                            // 过滤：伤害来源必须存在，且仍然在场（以防同归于尽后比对不到数据）
                            return event.source && event.source.isIn() && player.isAlive();
                        },
                        content: function () {
                            var source = trigger.source;
                            var count = 0;
                            var log_items = []; // 用于收集相同项的名称，以便向玩家输出明确的日志

                            // 1. 比对：手牌数
                            if (player.countCards('h') === source.countCards('h')) {
                                count++;
                                log_items.push('手牌数');
                            }

                            // 2. 比对：体力值
                            if (player.hp === source.hp) {
                                count++;
                                log_items.push('体力值');
                            }

                            // 3. 比对：装备区牌数
                            if (player.countCards('e') === source.countCards('e')) {
                                count++;
                                log_items.push('装备区牌数');
                            }

                            // 结算摸牌
                            if (count > 0) {
                                player.logSkill('ms_zhihe'); // 发动锁定技特效
                                game.log(player, '与', source, '的', '#g' + log_items.join('、'), '相同，摸了', '#y' + count, '张牌');
                                player.draw(count);
                            } else {
                                // 如果一项都没中，打印提示信息，防止玩家产生为什么没摸牌的疑惑
                                game.log(player, '与', source, '的各项指标均不相同，无法通过【志合】摸牌');
                            }
                        }
                    }
                },

                translate: {
                    "diy_zhuanhuan_sha": "牵逊",
                    "diy_zhuanhuan_sha_info": "<b>转换技。</b><br><b>阳：</b>出牌阶段，你可以用一张【杀】交换一名其他角色的一张手牌。<br><b>阴：</b>出牌阶段，你可以令一名其他角色将手牌中最多的同牌名牌当一张【杀】对你使用。",
                    "ms_jianxiong": "举贤",
                    "ms_jianxiong_info": "当你造成或受到伤害后，你可以令受伤角色获得造成此伤害的牌。",

                    "ms_jianhu": "监护",
                    "ms_jianhu_info": "你距离1以内的一名角色成为【杀】的目标后，你可以交给其任意张手牌。然后若你的手牌数：<br>1.不大于体力值，你摸等量张牌；<br>2.不小于体力值，此【杀】伤害加等量值。",
                    "ms_gujia": "骨甲",
                    "ms_gujia_info": "<b>限定技，</b>出牌阶段，你可以令你本回合下一次使用【杀】额外指定x个无距离限制的目标（x为你受到的伤害总数）。",

                    "ms_zhaoxin": "昭心",
                    "ms_zhaoxin_info": "出牌阶段，你可以展示手牌，然后令所有其他角色依次猜测本回合你使用的下张牌是哪张。本回合你使用下张牌结算后，其他角色依次根据其的猜测结果执行对应效果：<br>若猜测错误，你视为对其使用一张【决斗】；<br>若猜测正确，其视为对你使用一张【决斗】。",
                    "ms_hezou": "合奏",
                    "ms_hezou_info": "当你响应其他角色，或其他角色响应你使用的牌时，你摸一张牌。",

                    // ⚡【新增】：桂花双技能在武将面板上的解释说明
                    "ms_mingjie": "命节",
                    "ms_mingjie_info": "你可以将手牌 摸或弃 至当前体力值，视为使用一张【无懈可击】或者【闪】。",
                    "ms_huqu": "虎驱",
                    "ms_huqu_info": "出牌阶段，你可以与一名体力值大于你的其他角色拼点：<br>输的角色将所有牌当一张普通锦囊牌使用；<br>赢的角色受到1点伤害。",

                    "ms_xingxiang": "星象",
                    "ms_xingxiang_info": "<b>转换技。</b><br>①.一名角色使用基本牌时，你可以令此牌无效，然后；<br>②.出牌阶段，你可以:<br>猜测牌堆顶 <b>已损失体力值＋<span style='color:red;'>七</span></b> 张牌的颜色并观看之:<br>如果猜测有错误，你任意移动这些牌至牌堆顶或牌堆底；<br>每错误一张，令红色数字-1（至少为1）；<br>每正确一张，你摸一张牌。",
                    "ms_xingxiang_resp": "星象", // 隐藏技能的同名占位

                    "ms_nangqing": "囊青",
                    "ms_nangqing_info": "<b>锁定技，</b>你造成或受到的伤害，均视为回复等量体力；你回复体力后，摸两张牌。",
                    "ms_xuanhu": "悬壶",
                    "ms_xuanhu_info": "①出牌阶段每名角色限一次，你可以弃置一张红色牌，令其回复一点体力；<br>②当你令一名角色回复体力时，该角色获得一个【治】标记；<br>③整局游戏限一次，当你回复至满体力，你失去【囊青】，获得【济世】。",
                    "ms_jishi": "济世",
                    "ms_jishi_info": "每名角色每项限一次，出牌阶段，你可以移除其任意个【治】标记，然后选择一项：<br>1.对其造成两倍移除【治】数的伤害；<br>2.获得其两倍移除【治】数的牌。",
                    "#ms_zhi": "治",
                    "ms_zhi_bg": "治",

                    "ms_tiandu": "天妒",
                    "ms_tiandu_info": "<b>转换技，锁定技，</b><br>①你的上家或下家受到伤害后，你受到等量伤害；<br>②你成为【杀】的目标后，你回复一点体力。",
                    "ms_yiji": "遗计",
                    "ms_yiji_info": "当你受到1点伤害后，你可以摸两张牌，然后你可以将至多两张手牌分配给其他角色。",

                    "ms_yinlang": "引狼",
                    "ms_yinlang_info": "<b>使命技，</b>准备阶段，你令一名角色获得“戾气”。<br><b>使命成功：</b>若拥有“戾气”的角色不少于角色数的一半：①修改【咒杀】；②提前触发【祸始】的红色效果。",
                    "ms_huoshi": "祸始",
                    "ms_huoshi_mark": "祸始",
                    "ms_huoshi_info": "<b>锁定技，</b>你死亡后，选择一名角色，其回合开始后：<br><span style=\"color:#ff3333;\">本局游戏所有角色不能再使用【桃】【闪】【无懈可击】。</span>",
                    "ms_zhousha": "咒杀",
                    "ms_zhousha_info": "每回合每名角色限一次，有“戾气”的角色使用牌时（不能对闪和无懈可击发动），你可以令此牌转化为【决斗】。<br><b>（修改后）：</b>你可以令此牌转化为【决斗】，并重新选择任意名其它角色作为此牌目标。",
                    "ms_liqi": "戾气",

                    "ms_shendao": "神道",
                    "ms_shendao_info": "当一名角色的判定牌生效前，你可以打出一张牌替换之。",
                    "ms_leiji": "雷击",
                    "ms_leiji_info": "①当你的判定牌生效后，若此牌的花色为：<br>♠，你可以对一名角色造成一点伤害；<br>♣，你弃置一名角色一张牌。<br>②当你使用或打出基本牌时，你可以进行一次判定。",
                    // 解决子技能显示英文的问题：
                    "ms_leiji_effect1": "雷击",
                    "ms_leiji_effect2": "雷击",

                    "ms_nisu": "泥塑",
                    "ms_nisu_info": "<b>锁定技，</b>游戏开始时，你为每名角色的一个勾玉施加标记,你可以令标记勾玉变亏盈来防止伤害;<br>当一名角色的一个<b>标记勾玉</b>变为<span style=\"color: red;\">亏损</span>时，你摸一张牌；<br>当一名角色的一个<b>标记勾玉</b>变为<span style=\"color: blue;\">充盈</span>时，你再标记该角色的一个未标记勾玉。",
                    "ms_duoji": "夺羁",
                    "ms_duoji_info": "出牌阶段各限一次，你可以令一名角色：<br>弃置两张牌，并回复一点体力；<br>失去一点体力，并摸两张牌；<br>若其所有勾玉被标记，失去所有体力。",
                    "ms_duoji_eff1": "失去1体力并摸2牌",
                    "ms_duoji_eff2": "弃置2张牌并回复1体力",
                    "ms_duoji_eff3": "失去所有体力",

                    "ms_duorui": "夺锐",
                    "ms_duorui_info": "当你对一名其他角色造成伤害后，你可以选择该角色的武将牌上的一个技能，令其于其下回合结束之前此技能无效，然后你于其下回合结束前视为拥有此技能。",
                    "ms_huashi": "化石",
                    "ms_huashi_info": "当你受到伤害后，你可以翻面并视为使用一张【决斗】。",

                    "ms_niulun": "牛论",
                    "ms_niulun_info": "当一名角色使用牌时，若此牌不是其手牌，你可以摸一张牌。",
                    "ms_jieai": "劫爱",
                    "ms_jieai_info": "锁定技，你可以使用明置牌；当你对一名角色使用基本牌时，其获得本技能，若其已拥有本技能，则其明置一张即时牌。",
                    "ms_jieai_use": "劫爱",

                    "ms_zongheng": "纵横",
                    "ms_zongheng_info": "当你使用基本牌或普通锦囊牌指定目标后，你可以取消目标，再改为所有非目标角色为目标。",
                    "ms_zhihe": "志合",
                    "ms_zhihe_info": "<b>锁定技，</b>当你受到伤害后，伤害来源以下每有一项与你相同，你摸一张牌：<br>1.手牌数；<br>2.体力值；<br>3.装备区牌数。",

                    "extension_mengshen_name": "萌神再临"
                }
            }
        },

        files: {
            // ⚡【新增】：“ms_guihua” 进入图片预读取数组，确保游戏认得桂花立绘
            // 确保把 "ms_tianheshaye" 加进去
            character: ["ms_xishixiang", "ms_xiaopa", "ms_duoluda", "ms_guihua", "ms_tianheshaye", "ms_xiaolei", "ms_setsumi", "ms_zhaliu", "ms_lihua", "ms_nanoka", "ms_jiutiaodu", "ms_chaimenhuan", "ms_xierweiya"],
            card: [],
            skill: []
        }
    };
});