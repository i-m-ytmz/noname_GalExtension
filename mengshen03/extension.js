'use strict';
game.import("extension", function (lib, game, ui, get, ai, _status) {
    return {
        name: "萌神再临_键", // 扩展包的内部名称
        content: function (config, pack) { },
        precontent: function () { },
        config: {},
        help: {},

        // ================= 【核心包裹层】 =================
        package: {

            // ---------------- 1. 武将注册区 ----------------
            character: {
                // 1.1 登记武将的基本属性（性别、势力、血量、拥有的技能、武将描述和立绘路径）
                character: {
                    // 佐藤雏
                    "ms_satohina": ["female", "qun", 3, ["ms_feisheng"], ["des:【佐藤雏】<br>出自《成神之日》。", "ext:mengshen03/ms_satohina.jpg"]],

                    // 神户小鸟：女，群势力，3体力
                    "ms_shenhuxiaoniao": ["female", "qun", 3, ["ms_sushen", "ms_qiangyu"], ["des:【神户小鸟】<br>新角色描述。", "ext:mengshen03/ms_shenhuxiaoniao.jpg"]],

                    // 篝：女，群势力，3体力
                    "ms_gouri": ["female", "qun", 3, ["ms_tianyi", "ms_didong", "ms_shuguang"], ["des:【篝】<br>新角色描述。", "ext:mengshen03/ms_gouri.jpg"]],

                    // 古河渚：女，群势力，3体力
                    "ms_furukawanagisa": ["female", "qun", 3, ["ms_yifu", "ms_jinjin"], ["des:【古河渚】<br>出自《CLANNAD》", "ext:mengshen03/ms_furukawanagisa.jpg"]],

                    // 坂上智代：女，群势力，3体力
                    "ms_sakagamitomoyo": ["female", "qun", 3, ["ms_duodi", "ms_ningzhong"], ["des:【坂上智代】<br>出自《CLANNAD》", "ext:mengshen03/ms_sakagamitomoyo.jpg"]],

                    // 库特：女，群势力，3体力
                    "ms_kute": ["female", "qun", 3, ["ms_qiuzhi", "ms_ruxian"], ["des:【库特】", "ext:mengshen03/ms_kute.jpg"]],

                    // 立华奏：女，群势力，4体力/7上限
                    "ms_lihuazou": ["female", "qun", "4/7", ["ms_huaiyuan"], ["des:【立华奏】", "ext:mengshen03/ms_lihuazou.jpg"]],

                    // 神尾观铃：女，群势力，4体力
                    "ms_guanling": ["female", "qun", 4, ["ms_yuhua"], ["des:【神尾观铃】", "ext:mengshen03/ms_guanling.jpg"]],

                    // 折原浩平：男，群势力，5体力
                    "ms_oriharakohei": ["male", "qun", 5, ["ms_aobi"], ["des:【折原浩平】<br>出自《ONE～辉之季节～》", "ext:mengshen03/ms_oriharakohei.jpg"]],

                    // 䌷文德斯：女，群势力，4体力
                    "ms_tsumugiwenders": ["female", "qun", 4, ["ms_huaxing"], ["des:【䌷文德斯】<br>出自《Summer Pockets》", "ext:mengshen03/ms_tsumugiwenders.jpg"]],

                    // 月宫亚由：女，群势力，3体力
                    "ms_tsukimiyaayu": ["female", "qun", 3, ["ms_duoduo", "ms_mitu"], ["des:【月宫亚由】<br>出自《Kanon》。", "ext:mengshen03/ms_tsukimiyaayu.jpg"]],

                    // 枣恭介：男，群势力，4体力
                    "ms_natsumekyousuke": ["male", "qun", 4, ["danshi"], ["des:【枣恭介】<br>出自《Little Busters!》。", "ext:mengshen03/ms_natsumekyousuke.jpg"]],

                    // 仲村由理：女，群势力，3体力
                    "ms_nakamurayuri": ["female", "qun", 3, ["ms_zhuoweng", "ms_chuyuan"], ["des:【仲村由理】<br>出自《Angel Beats!》。", "ext:mengshen03/ms_nakamurayuri.jpg"]],
                },

                // 1.2 登记所有需要在游戏界面中显示的中文翻译
                translate: {
                    // --- 扩展包名字翻译 ---
                    "extension_mengshen03_name": "萌神再临_键",

                    // --- 武将名字翻译 ---
                    "ms_satohina": "佐藤雏",
                    "ms_shenhuxiaoniao": "神户小鸟",
                    "ms_gouri": "篝",
                    "ms_furukawanagisa": "古河渚",
                    "ms_sakagamitomoyo": "坂上智代",
                    "ms_kute": "库特",
                    "ms_lihuazou": "立华奏",
                    "ms_guanling": "神尾观铃",
                    "ms_oriharakohei": "折原浩平",
                    "ms_tsumugiwenders": "䌷文德斯",
                    "ms_tsukimiyaayu": "月宫亚由",
                    "ms_natsumekyousuke": "枣恭介",
                    "ms_nakamurayuri": "仲村由理",
                }
            },

            // ---------------- 2. 卡牌注册区 ----------------
            card: {
                card: {},
                translate: {},
                list: []
            },

            // ---------------- 3. 技能代码区 ----------------
            skill: {
                skill: {

                    //------------------佐藤雏------------------
                    "ms_feisheng": {
                        unique: true,
                        mark: true,
                        intro: { content: "limited" },
                        skillAnimation: true,
                        animationColor: "orange",
                        enable: "phaseUse",
                        // 【AI 注入】：主动技的 AI 发动意愿与优先级。
                        // 优先级设为 8（偏高），因为白嫖一张锦囊牌通常稳赚不赔，AI 会在出牌阶段优先考虑使用。
                        ai: {
                            order: 8,
                            result: {
                                player: 1 // 告诉 AI，发动这个技能对自己有正向收益
                            }
                        },
                        filter: function (event, player) {
                            return !player.storage.ms_feisheng_awakened;
                        },
                        content: function () {
                            "step 0"
                            var list = [];
                            for (var i in lib.card) {
                                if (lib.card[i].type == 'trick' && !lib.card[i].derivation && lib.card[i].subtype != 'delay') {
                                    if (lib.card[i].mode && !lib.card[i].mode.includes(get.mode())) continue;
                                    list.push(['锦囊', '', i]);
                                }
                            }
                            player.chooseButton(['飞升：请选择要视为使用的普通锦囊', [list, 'vcard']]).set('filterButton', function (button) {
                                var card = { name: button.link[2], isCard: true };
                                try {
                                    return game.hasPlayer(function (current) {
                                        return player.canUse(card, current);
                                    });
                                } catch (e) { return false; }
                            }).set('ai', function (button) {
                                // 【AI 注入】：AI 选牌逻辑优化
                                // 优先选择能带来最大收益的锦囊（如无中生有、顺手牵羊等）
                                var val = get.value({ name: button.link[2] }, _status.event.player);
                                // 给无中生有和顺手牵羊更高的额外权重
                                if (button.link[2] == 'wuzhong' || button.link[2] == 'shunshou') val += 3;
                                return val || 1;
                            });
                            "step 1"
                            if (result.bool && result.links && result.links[0]) {
                                var cardName = result.links[0][2];
                                event.vcard = { name: cardName, isCard: true };
                                player.chooseUseTarget(event.vcard, true, false);
                            } else {
                                event.finish();
                            }
                            "step 2"
                            if (result.bool) {
                                player.storage.ms_feisheng_awakened = true;
                                player.awakenSkill('ms_feisheng');

                                if (player.countCards('h') == 0) {
                                    game.log(player, '没有手牌，无法进行拼点！');
                                    event.finish();
                                    return;
                                }

                                var satohina = game.filterPlayer(function (current) {
                                    return current.name == 'ms_satohina' || current.name1 == 'ms_satohina' || current.name2 == 'ms_satohina';
                                })[0];
                                event.satohina = satohina || player;

                                event.satohina.chooseTarget('飞升：请选择一名角色与 ' + get.translation(player) + ' 拼点', 1, function (card, button, target) {
                                    var sourcePlayer = _status.event.sourcePlayer;
                                    return target != sourcePlayer && target.canCompare(sourcePlayer);
                                }).set('sourcePlayer', player).set('ai', function (target) {
                                    // 【AI 注入】：佐仓（或自己）的深度博弈选人逻辑
                                    // 逻辑拆解：A（target）主动与 B（sourcePlayer/飞升者）拼点。
                                    // 1. 若 A 赢了：A 抢走 B 的牌。（对 A 有利，对 B 有害）
                                    // 2. 若 A 输了：A 获得负面技能“成疾”。（对 A 有害）
                                    var satohinaPlayer = _status.event.player;
                                    var bPlayer = _status.event.sourcePlayer;

                                    // 评估 B (飞升者) 的手牌点数，判断 B 拼点赢的概率
                                    var bCards = bPlayer.getCards('h');
                                    var hasBigCard = false;
                                    for (var i = 0; i < bCards.length; i++) {
                                        if (get.number(bCards[i]) >= 11) { // 若有 J, Q, K
                                            hasBigCard = true;
                                            break;
                                        }
                                    }

                                    if (hasBigCard) {
                                        // 情况一：B 有大牌，A 发起拼点大概率会输 -> A 将获得负面状态“成疾”。
                                        // 既然结果是受罚，佐仓当然要把这个惩罚塞给敌人！
                                        return -get.attitude(satohinaPlayer, target);
                                    } else {
                                        // 情况二：B 手牌点数小，A 发起拼点大概率会赢 -> A 会抢走 B 的牌。
                                        // 既然结果是“目标拿牌”，佐仓应当选自己的队友（如果是敌人的牌就去抢，是队友的牌就内部消化，避免流失）。
                                        return get.attitude(satohinaPlayer, target);
                                    }
                                });
                            } else {
                                event.finish();
                            }
                            "step 3"
                            if (result.bool && result.targets && result.targets.length) {
                                event.target = result.targets[0];
                                event.target.chooseToCompare(player);
                            } else {
                                event.finish();
                            }
                            "step 4"
                            if (result.bool !== undefined && !result.cancelled) {
                                var targetWin = result.bool;
                                if (targetWin) {
                                    var targetNum = get.number(result.player);
                                    var cards = event.target.getCards('he', function (card) {
                                        return get.number(card) <= targetNum;
                                    });
                                    if (cards.length > 0) {
                                        player.gain(cards, event.target, 'giveAuto');
                                    }
                                } else {
                                    event.target.addSkill('ms_chengji');
                                    event.target.storage.ms_chengji_awakened = false;
                                    event.target.restoreSkill('ms_chengji');
                                    game.log(event.target, '获得了衍生技能', '【成疾】');
                                }
                            }
                        }
                    },

                    "ms_chengji": {
                        unique: true,
                        mark: true,
                        forced: true, // 锁定技，不需要外层 AI 发动判定
                        intro: { content: "limited" },
                        skillAnimation: true,
                        animationColor: "fire",
                        trigger: { player: ['chooseToRespondBegin', 'chooseToUseBegin'] },
                        filter: function (event, player) {
                            if (player.storage.ms_chengji_awakened) return false;
                            if (event.responded) return false;
                            if (typeof event.filterCard == 'function' && event.filterCard({ name: 'shan', isCard: true }, player, event) && event.targetRequired !== true) return true;
                            return false;
                        },
                        content: function () {
                            player.storage.ms_chengji_awakened = true;
                            player.awakenSkill('ms_chengji');

                            trigger.untrigger();
                            trigger.responded = true;
                            trigger.result = { bool: true, card: { name: 'shan', isCard: true }, skill: 'ms_chengji' };

                            player.storage.ms_chengji_pending = true;
                            player.addSkill('ms_chengji_after');
                        }
                    },

                    "ms_chengji_after": {
                        charlotte: true,
                        trigger: { global: ['respondAfter', 'useCardAfter'] },
                        forced: true, // 锁定技，不需要外层 AI
                        popup: false,
                        filter: function (event, player) {
                            return player.storage.ms_chengji_pending && event.player == player && (event.skill == 'ms_chengji' || (event.card && event.card.name == 'shan'));
                        },
                        content: function () {
                            "step 0"
                            player.storage.ms_chengji_pending = false;
                            player.removeSkill('ms_chengji_after');

                            if (player.countCards('h') == 0) {
                                game.log(player, '没有手牌，无法进行拼点！');
                                event.finish();
                                return;
                            }

                            var satohina = game.filterPlayer(function (current) {
                                return current.name == 'ms_satohina' || current.name1 == 'ms_satohina' || current.name2 == 'ms_satohina';
                            })[0];
                            event.satohina = satohina || player;

                            event.satohina.chooseTarget('成疾：请选择一名角色与 ' + get.translation(player) + ' 拼点', 1, function (card, button, target) {
                                var sourcePlayer = _status.event.sourcePlayer;
                                return target != sourcePlayer && sourcePlayer.canCompare(target);
                            }).set('sourcePlayer', player).set('ai', function (target) {
                                // 【AI 注入】：佐仓选人逻辑
                                // 逻辑拆解：B（sourcePlayer/成疾者）主动与 A（target）拼点。
                                // 1. 若 B 赢了：B 把自己的牌给 A。（A 白嫖牌）
                                // 2. 若 B 输了：A 获得“飞升”技能。（A 白嫖技能）
                                // 结论：无论拼点输赢，对 A（target）来说都是纯收益！
                                // 所以佐仓的 AI 非常明确：永远把这个好处给自己的队友！
                                var satohinaPlayer = _status.event.player;
                                return get.attitude(satohinaPlayer, target);
                            });
                            "step 1"
                            if (result.bool && result.targets && result.targets.length) {
                                event.target = result.targets[0];
                                player.chooseToCompare(event.target);
                            } else {
                                event.finish();
                            }
                            "step 2"
                            if (result.bool !== undefined && !result.cancelled) {
                                var playerWin = result.bool;
                                if (playerWin) {
                                    var playerNum = get.number(result.player);
                                    var cards = player.getCards('he', function (card) {
                                        return get.number(card) <= playerNum;
                                    });
                                    if (cards.length > 0) {
                                        event.target.gain(cards, player, 'giveAuto');
                                    }
                                } else {
                                    event.target.addSkill('ms_feisheng');
                                    event.target.storage.ms_feisheng_awakened = false;
                                    event.target.restoreSkill('ms_feisheng');
                                    game.log(event.target, '获得了衍生技能', '【飞升】');
                                }
                            }
                        }
                    },

                    // ================= 小鸟 =================

                    "ms_sushen": {
                        audio: 2,
                        trigger: { global: "roundStart" },
                        direct: true,
                        filter: function (event, player) {
                            return game.hasPlayer(function (current) { return current.isAlive(); });
                        },
                        content: function () {
                            "step 0"
                            player.chooseTarget(get.prompt('ms_sushen'), '令一名角色提前执行出牌阶段，此阶段结束时你可以对其造成 [4 - 期间进入弃牌堆的花色数] 点伤害。').set('ai', function (target) {
                                return get.attitude(_status.event.player, target) > 0 ? 1 : (target.countCards('h') > 2 ? -1 : 0);
                            });

                            "step 1"
                            if (result.bool && result.targets && result.targets.length) {
                                var target = result.targets[0];
                                player.logSkill('ms_sushen', target);

                                // 给目标埋下地雷，跳过其本回合真正的出牌阶段
                                target.addSkill('ms_sushen_skip');

                                // 初始化花色追踪器
                                target.addTempSkill('ms_sushen_track', { global: 'roundStart' });
                                target.storage.ms_sushen_suits = [];

                                game.log(target, '因', player, '的', '#g【塑身】', '提前执行了出牌阶段');

                                // 强制插入出牌阶段，并打上专门的特殊通行证标签
                                var next = target.phaseUse();
                                next._ms_sushen = true;
                                next.ms_sushen_source = player;
                            }
                        },
                        group: ["ms_sushen_damage"]
                    },
                    "ms_sushen_damage": { // 塑身：阶段结束时的伤害结算
                        trigger: { global: "phaseUseAfter" },
                        forced: true,
                        silent: true,
                        charlotte: true,
                        filter: function (event, player) {
                            return event._ms_sushen && event.ms_sushen_source === player;
                        },
                        content: function () {
                            "step 0"
                            var target = trigger.player;
                            var suits = target.storage.ms_sushen_suits || [];
                            var x = 4 - suits.length;
                            event.damageNum = x;
                            event.target = target;

                            if (x > 0) {
                                player.chooseBool('塑身：是否对 ' + get.translation(target) + ' 造成 ' + x + ' 点伤害？').set('ai', function () {
                                    return get.attitude(player, target) < 0;
                                });
                            } else {
                                event.finish();
                            }

                            "step 1"
                            if (result.bool) {
                                player.logSkill('ms_sushen', event.target);
                                event.target.damage(event.damageNum, player);
                            }

                            // 结算完毕，清理花色追踪器
                            event.target.removeSkill('ms_sushen_track');
                            delete event.target.storage.ms_sushen_suits;
                        }
                    },
                    "ms_sushen_skip": { // 塑身：抹除目标原本回合的出牌阶段
                        trigger: { player: "phaseUseBefore" },
                        forced: true,
                        charlotte: true,
                        filter: function (event, player) {
                            return !event._ms_sushen;
                        },
                        content: function () {
                            trigger.cancel();
                            player.removeSkill('ms_sushen_skip');
                            game.log(player, '的', '#y出牌阶段', '因', '#g【塑身】', '被跳过了');
                        }
                    },
                    "ms_sushen_track": { // 塑身：追踪本阶段内进入弃牌堆的物理牌花色
                        trigger: { global: ["loseToDiscardpileAfter", "cardsDiscardAfter", "useCardAfter"] },
                        forced: true,
                        silent: true,
                        charlotte: true,
                        filter: function (event, player) {
                            return player.storage.ms_sushen_suits !== undefined;
                        },
                        content: function () {
                            var cards = trigger.cards || [];
                            for (var i = 0; i < cards.length; i++) {
                                var c = cards[i];
                                // 验证确实去到了弃牌堆
                                if (c.parentNode === ui.discardPile || get.position(c, true) === 'd') {
                                    var suit = get.suit(c, false);
                                    if (lib.suit.includes(suit) && !player.storage.ms_sushen_suits.includes(suit)) {
                                        player.storage.ms_sushen_suits.push(suit);
                                    }
                                }
                            }
                        }
                    },

                    // ================= 2. 强欲 =================
                    // ================= 2. 强欲 =================
                    "ms_qiangyu": {
                        audio: 2,
                        trigger: { global: "useCardAfter" },
                        direct: true,
                        filter: function (event, player) {
                            var target = event.player;
                            // 1. 判断是否在“真正回合外”，特批【塑身】阶段也算回合外
                            var isOutside = (_status.currentPhase !== target) || (event.getParent('phaseUse') && event.getParent('phaseUse')._ms_sushen);
                            if (!isOutside) return false;

                            // 2. 判断是否为本轮首次使用该类型
                            var type = get.type(event.card, 'trick');
                            if (target.storage.ms_qiangyu_types && target.storage.ms_qiangyu_types.includes(type)) return false;

                            // 3. 目标必须还有手牌供你观看
                            return target.countCards('h') > 0;
                        },
                        content: function () {
                            "step 0"
                            var target = trigger.player;
                            var type = get.type(trigger.card, 'trick');
                            event.typeStr = type;

                            // 记录本轮已使用过该类型，并挂载跨轮清理技能
                            if (!target.storage.ms_qiangyu_types) {
                                target.storage.ms_qiangyu_types = [];
                                target.addTempSkill('ms_qiangyu_clear', { global: 'roundStart' });
                            }
                            target.storage.ms_qiangyu_types.push(type);

                            // 获取目标的所有手牌
                            var cards = target.getCards('h');
                            var hasSameType = cards.some(function (c) {
                                return get.type(c, 'trick') === type;
                            });

                            if (hasSameType) {
                                // 【核心修改】：使用 chooseButton + dialog，将对方手牌“明着”铺出来供你选择！
                                player.chooseButton(
                                    ui.create.dialog('强欲：观看 ' + get.translation(target) + ' 的手牌，并选择一张【' + get.translation(type) + '】牌', cards),
                                    1
                                ).set('filterButton', function (button) {
                                    // 只有同类型的牌才能被点选
                                    return get.type(button.link, 'trick') === _status.event.cardType;
                                }).set('cardType', type).set('ai', function (button) { return 1; });
                            } else {
                                // 如果没有同类型，也明着给你看一眼对方的牌，但选牌数为 0（只能看，不能选）
                                player.chooseButton(
                                    ui.create.dialog('强欲：' + get.translation(target) + ' 的手牌中没有同类型牌', cards),
                                    0
                                );
                            }

                            "step 1"
                            if (result.bool && result.links && result.links.length) {
                                event.selectedCard = result.links[0];
                                player.chooseControl('无中生有', '逐近弃远', '决斗', 'cancel2').set('prompt', '令 ' + get.translation(event.selectedCard) + ' 本回合视为附带【毒】效果的：').set('ai', function () {
                                    return '决斗';
                                });
                            } else {
                                event.finish();
                            }

                            "step 2"
                            if (result.control && result.control !== 'cancel2') {
                                player.logSkill('ms_qiangyu', trigger.player);
                                var card = event.selectedCard;
                                var control = result.control;
                                var cardName = control === '无中生有' ? 'wuzhong' : (control === '逐近弃远' ? 'zhujinqiyuan' : 'juedou');

                                // 给被污染的卡牌打上隐式标记
                                card._ms_qiangyu_name = cardName;
                                card._ms_qiangyu_poison = true;

                                if (!trigger.player.storage.ms_qiangyu_cards) trigger.player.storage.ms_qiangyu_cards = [];
                                if (!trigger.player.storage.ms_qiangyu_cards.includes(card)) trigger.player.storage.ms_qiangyu_cards.push(card);

                                // 赋予目标强制篡改卡牌名、以及失去卡牌时流血的技能
                                trigger.player.addSkill('ms_qiangyu_mod');
                                trigger.player.addSkill('ms_qiangyu_poison');

                                game.log(player, '令', trigger.player, '的一张手牌视为了附带', '#p【毒】', '效果的', '#y【' + result.control + '】');
                            }
                        }
                    },
                    "ms_qiangyu_mod": { // 强欲：负责篡改卡牌名称的隐形拦截器
                        mod: {
                            cardname: function (card, player, name) {
                                if (card._ms_qiangyu_name) return card._ms_qiangyu_name;
                            }
                        },
                        charlotte: true,
                        silent: true
                    },
                    "ms_qiangyu_poison": { // 强欲：核心毒效果，失去牌即扣血
                        trigger: { player: "loseAfter" },
                        forced: true,
                        charlotte: true,
                        silent: true,
                        filter: function (event, player) {
                            if (!event.cards) return false;
                            for (var i = 0; i < event.cards.length; i++) {
                                if (event.cards[i]._ms_qiangyu_poison) return true;
                            }
                            return false;
                        },
                        content: function () {
                            var num = 0;
                            for (var i = 0; i < trigger.cards.length; i++) {
                                if (trigger.cards[i]._ms_qiangyu_poison) {
                                    num++;
                                    // 失去牌后立刻清理毒标记，防止在弃牌堆中或者被别人拿到后二次触发
                                    delete trigger.cards[i]._ms_qiangyu_poison;
                                }
                            }
                            if (num > 0) {
                                game.log(player, '失去了附带', '#p【毒】', '效果的牌');
                                player.loseHp(num);
                            }
                        }
                    },
                    "ms_qiangyu_clear": { // 强欲：每轮开始时的清理机制
                        trigger: { global: "roundStart" },
                        forced: true,
                        silent: true,
                        charlotte: true,
                        content: function () {
                            var cards = player.storage.ms_qiangyu_cards || [];
                            for (var i = 0; i < cards.length; i++) {
                                delete cards[i]._ms_qiangyu_name;
                                delete cards[i]._ms_qiangyu_poison;
                            }
                            delete player.storage.ms_qiangyu_cards;
                            delete player.storage.ms_qiangyu_types;
                            player.removeSkill('ms_qiangyu_clear');
                            player.removeSkill('ms_qiangyu_mod');
                            player.removeSkill('ms_qiangyu_poison');
                        }
                    },

                    // ================= 篝=================






                    // ================= 1. 天意 =================
                    "ms_tianyi": {
                        // 1. 将触发时机改为全局监听
                        trigger: {
                            global: "damageEnd"
                        },
                        filter: function (event, player) {
                            // 2. 只要你是受伤者，或者你是伤害来源，就满足条件。
                            // 由于是 global 时机，即使你同时是受伤者和来源（自己打自己），这个事件也只会进这里一次！
                            return event.player === player || event.source === player;
                        },
                        content: function () {
                            "step 0"
                            // 3. 这里的逻辑你写得非常完美，完全不用动！
                            // 如果是自己打自己，trigger.source === player，得出 target 是自己。
                            var target = (trigger.source === player) ? trigger.player : trigger.source;

                            // 然后自己打自己时，target = null，完美剥离了“对方”的概念。
                            if (target === player) target = null;
                            event.duifang = target;

                            var choices = [];

                            // 选项一：如果 target 是 null，这个选项自然就不会推入数组，极其安全！
                            if (target && target.getCards('j').length > 0) {
                                choices.push('选项一：获得对方判定牌');
                            }
                            // 选项二
                            choices.push('选项二：令一名角色判定【闪电】');
                            choices.push('cancel2'); // 取消

                            player.chooseControl(choices).set('prompt', '天意：造成或受到伤害后，请选择一项').set('ai', function () {
                                if (choices.includes('选项一：获得对方判定牌')) return '选项一：获得对方判定牌';
                                return '选项二：令一名角色判定【闪电】';
                            });

                            "step 1"
                            if (result.control === '选项一：获得对方判定牌') {
                                event.choice = 1;
                                player.logSkill('ms_tianyi', event.duifang);
                                player.choosePlayerCard(event.duifang, 'j', true).set('prompt', '天意：请获得 ' + get.translation(event.duifang) + ' 判定区内的一张牌');
                            } else if (result.control === '选项二：令一名角色判定【闪电】') {
                                event.choice = 2;
                                player.logSkill('ms_tianyi');
                                player.chooseTarget('天意：请选择一名角色进行【闪电】判定', 1, function (card, player, target) {
                                    return true;
                                }).set('ai', function (target) {
                                    return get.attitude(player, target) < 0 ? 1 : -1;
                                });
                            } else {
                                event.finish();
                            }

                            "step 2"
                            if (event.choice === 1) {
                                if (result.bool && result.links && result.links.length > 0) {
                                    player.gain(result.links, 'gain2');
                                }
                                event.finish();
                            } else if (event.choice === 2) {
                                if (result.bool && result.targets && result.targets.length > 0) {
                                    event.lightningTarget = result.targets[0];
                                    var next = event.lightningTarget.judge(function (card) {
                                        if (get.suit(card) === 'spade' && get.number(card) >= 2 && get.number(card) <= 9) return -2;
                                        return 0;
                                    });
                                    next.judge2 = function (result) {
                                        if (result.bool === false) {
                                            event.lightningTarget.damage(3, 'thunder', 'nosource');
                                        }
                                    };
                                }
                                event.finish();
                            }
                        }
                    },

                    // ================= 2. 地动 =================

                    "ms_didong": {
                        name: "地动",
                        info: "当你需要使用基本牌时，你可以交换游戏中两个区域（只能是手牌或判定区）内的牌，视为你使用一张基本牌。若交换的牌差小于等于上次交换的牌差，你失去此技能，否则你对区域内牌数变多的角色造成1点伤害。",
                        enable: "chooseToUse",
                        marktext: "差",
                        intro: {
                            content: function (storage, player) {
                                if (storage === undefined) return "尚未发动过，任意牌差均可保留技能";
                                return "上次交换的牌差为：" + storage;
                            }
                        },
                        filter: function (event, player) {
                            if (event.responded) {
                                return false;
                            }
                            var names = lib.inpile.filter(function (name) { return get.type(name) === "basic"; });
                            return names.some(function (name) {
                                return event.filterCard({ name: name, isCard: true }, player, event);
                            });
                        },
                        content: function () {
                            "step 0"
                            player.chooseTarget('地动：请选择【第一个】要交换区域的角色', 1).set('ai', function (target) {
                                // AI 读取推演好的完美剧本
                                var plan = _status.event.player.storage.ms_didong_ai_plan;
                                if (plan) return target === plan.t1 ? 1 : 0;
                                return 1; // 玩家的话保持默认高亮
                            });

                            "step 1"
                            if (result.bool && result.targets && result.targets.length > 0) {
                                event.target1 = result.targets[0];
                                player.chooseControl('手牌区', '判定区').set('prompt', '请选择 ' + get.translation(event.target1) + ' 的第一个区域').set('ai', function () {
                                    var plan = _status.event.player.storage.ms_didong_ai_plan;
                                    if (plan) return plan.z1 === 'h' ? '手牌区' : '判定区';
                                    return '手牌区';
                                });
                            } else {
                                event.finish();
                            }

                            "step 2"
                            if (result.control) {
                                event.zone1 = result.control === '手牌区' ? 'h' : 'j';
                                player.chooseTarget('地动：请选择【第二个】要交换区域的角色', 1).set('ai', function (target) {
                                    var plan = _status.event.player.storage.ms_didong_ai_plan;
                                    if (plan) return target === plan.t2 ? 1 : 0;
                                    return 1;
                                });
                            } else {
                                event.finish();
                            }

                            "step 3"
                            if (result.bool && result.targets && result.targets.length > 0) {
                                event.target2 = result.targets[0];
                                if (event.target1 === event.target2) {
                                    event.zone2 = event.zone1 === 'h' ? 'j' : 'h';
                                } else {
                                    player.chooseControl('手牌区', '判定区').set('prompt', '请选择 ' + get.translation(event.target2) + ' 的第二个区域').set('ai', function () {
                                        var plan = _status.event.player.storage.ms_didong_ai_plan;
                                        if (plan) return plan.z2 === 'h' ? '手牌区' : '判定区';
                                        return '手牌区';
                                    });
                                }
                            } else {
                                event.finish();
                            }

                            "step 4"
                            if (event.target1 === event.target2) {
                                // event.zone2 已被锁定赋值
                            } else if (result.control) {
                                event.zone2 = result.control === '手牌区' ? 'h' : 'j';
                            } else {
                                event.finish();
                                return;
                            }

                            player.logSkill('ms_didong');
                            var cardsA = event.target1.getCards(event.zone1).slice();
                            var cardsB = event.target2.getCards(event.zone2).slice();

                            event.cardsA = cardsA;
                            event.cardsB = cardsB;

                            // 提取底层真实实体牌防报错销毁
                            var getTrueCards = function (arr) {
                                var res = [];
                                for (var i = 0; i < arr.length; i++) {
                                    if (arr[i].cards && arr[i].cards.length > 0) {
                                        res.addArray(arr[i].cards);
                                    } else {
                                        res.push(arr[i]);
                                    }
                                }
                                return res;
                            };

                            event.trueCardsA = getTrueCards(cardsA);
                            event.trueCardsB = getTrueCards(cardsB);

                            if (cardsA.length > 0) event.target1.lose(cardsA, ui.special, 'to_special');
                            if (cardsB.length > 0) event.target2.lose(cardsB, ui.special, 'to_special');

                            "step 5"
                            var handleZone = function (char, zone, cards) {
                                if (!cards || !cards.length) return;
                                if (zone === 'h') {
                                    char.gain(cards, 'gain2');
                                } else if (zone === 'j') {
                                    for (var i = 0; i < cards.length; i++) {
                                        var card = cards[i];
                                        if (card.viewAs) delete card.viewAs;

                                        if (card.name === 'xumou_jsrg') {
                                            char.addJudge(card);
                                        } else if (get.type(card) === 'delay' && !char.hasJudge(card.name)) {
                                            char.addJudge(card);
                                        } else {
                                            char.addJudge({ name: 'xumou_jsrg' }, [card]);
                                            game.log(char, '将', card, '作为【蓄谋】牌置入判定区');
                                        }
                                    }
                                }
                            };

                            handleZone(event.target1, event.zone1, event.trueCardsB);
                            handleZone(event.target2, event.zone2, event.trueCardsA);

                            "step 6"
                            var diff = Math.abs(event.cardsA.length - event.cardsB.length);
                            var lastDiff = player.storage.ms_didong_diff;
                            game.log('本次【地动】交换的牌差为', diff);

                            player.storage.ms_didong_diff = diff;
                            player.markSkill('ms_didong');

                            if (lastDiff !== undefined && diff <= lastDiff) {
                                game.log(player, '本次牌差（' + diff + '）小于等于上次牌差（' + lastDiff + '），失去技能【地动】');
                                player.removeSkill('ms_didong');
                            } else {
                                var damageTargets = [];
                                if (event.target1 !== event.target2) {
                                    if (event.cardsB.length > event.cardsA.length) damageTargets.push(event.target1);
                                    if (event.cardsA.length > event.cardsB.length) damageTargets.push(event.target2);
                                }
                                if (damageTargets.length > 0) {
                                    event.damageTargets = damageTargets;
                                }
                            }

                            "step 7"
                            if (event.damageTargets && event.damageTargets.length > 0) {
                                for (var i = 0; i < event.damageTargets.length; i++) {
                                    event.damageTargets[i].damage(1, player, 'ms_didong');
                                }
                            }

                            "step 8"
                            var evt = event.getParent(2);
                            var names = lib.inpile.filter(function (name) { return get.type(name) === 'basic'; });
                            var list = [];

                            for (var i = 0; i < names.length; i++) {
                                var name = names[i];
                                var card = { name: name, isCard: true };
                                if (evt.filterCard(card, player, evt)) {
                                    list.push(['基本', '', name]);
                                }
                                if (name === 'sha' && lib.inpile_nature) {
                                    for (var j = 0; j < lib.inpile_nature.length; j++) {
                                        card.nature = lib.inpile_nature[j];
                                        if (evt.filterCard(card, player, evt)) {
                                            list.push(['基本', '', name, lib.inpile_nature[j]]);
                                        }
                                    }
                                }
                            }

                            if (list.length > 0) {
                                player.chooseButton(['视为使用一张基本牌', [list, 'vcard']], true).set('ai', function (button) {
                                    return player.getUseValue(button.link) + 1;
                                });
                            }

                            "step 9"
                            if (result && result.links && result.links.length) {
                                var name = result.links[0][2];
                                var nature = result.links[0][3];
                                var evt = event.getParent(2);

                                var assignBackup = function (name2, nature2) {
                                    lib.skill.ms_didong_backup.viewAs = { name: name2, nature: nature2, isCard: true };
                                    lib.skill.ms_didong_backup.prompt = '选择' + (nature2 ? get.translation(nature2) : '') + '【' + get.translation(name2) + '】的目标';
                                };

                                if (game.online) game.broadcastAll(assignBackup, name, nature);
                                assignBackup(name, nature);

                                evt.set('_backupevent', 'ms_didong_backup');
                                evt.backup('ms_didong_backup');
                                evt.set('openskilldialog', lib.skill.ms_didong_backup.prompt);
                                evt.set('norestore', true);
                                evt.set('custom', { add: {}, replace: { window: function () { } } });
                            }

                            "step 10"
                            // 扫尾工作：清理剧本防止脏数据
                            delete player.storage.ms_didong_ai_plan;
                            var evt = event.getParent(2);
                            if (evt) evt.goto(0);
                        },
                        // ============================================
                        // 🤖 最强大脑 AI 逻辑层：全盘推演与打分系统
                        // ============================================
                        ai: {
                            order: 4, // 优先级较高，有危难优先用这个抵挡
                            tag: { respond: 1, respondSha: 1, respondShan: 1, save: 1, recover: 1 },
                            result: {
                                player: function (player) {
                                    var evt = _status.event;
                                    // 是否处于濒死求桃、或被杀求闪的“生死存亡”时刻？
                                    var isCritical = (evt.dying || evt.type === 'chooseToRespond');

                                    var bestScore = -1000;
                                    var bestPlan = null;
                                    var lastDiff = player.storage.ms_didong_diff;
                                    var players = game.filterPlayer();
                                    var zones = ['h', 'j'];

                                    // 双重循环：模拟所有角色的区域交换可能
                                    for (var i = 0; i < players.length; i++) {
                                        for (var j = 0; j < players.length; j++) {
                                            for (var zi = 0; zi < zones.length; zi++) {
                                                for (var zj = 0; zj < zones.length; zj++) {
                                                    var t1 = players[i];
                                                    var t2 = players[j];
                                                    var z1 = zones[zi];
                                                    var z2 = zones[zj];

                                                    // 过滤掉毫无意义的交换（同一个人同一种区域）
                                                    if (t1 === t2 && z1 === z2) continue;

                                                    var cards1 = t1.getCards(z1);
                                                    var cards2 = t2.getCards(z2);
                                                    var diff = Math.abs(cards1.length - cards2.length);

                                                    var score = 0;

                                                    // 1. 技能留存度考核：如果这波交换会失去技能，大幅扣分
                                                    if (lastDiff !== undefined && diff <= lastDiff) {
                                                        score -= 20;
                                                    } else {
                                                        score += 2; // 能保住技能，加分
                                                    }

                                                    // 2. 伤害推演：判断谁会被扣血
                                                    var damageT1 = (cards2.length > cards1.length) && (t1 !== t2);
                                                    var damageT2 = (cards1.length > cards2.length) && (t1 !== t2);

                                                    // 结合身份倾向算分（坑死敌人加大分，坑队友扣大分）
                                                    if (damageT1) score -= get.attitude(player, t1) * 2;
                                                    if (damageT2) score -= get.attitude(player, t2) * 2;

                                                    // 3. 牌权转移：把牌给队友是好的，把牌送敌人是坏的
                                                    if (z1 === 'h') score += get.attitude(player, t1) * (cards2.length - cards1.length) * 0.5;
                                                    if (z2 === 'h') score += get.attitude(player, t2) * (cards1.length - cards2.length) * 0.5;

                                                    // 4. 判定区扫雷：如果把队友的延时锦囊/蓄谋移走是好事
                                                    if (z1 === 'j' && cards1.length > 0) score -= get.attitude(player, t1);
                                                    if (z2 === 'j' && cards2.length > 0) score -= get.attitude(player, t2);

                                                    // 记录最高得分剧本
                                                    if (score > bestScore) {
                                                        bestScore = score;
                                                        bestPlan = { t1: t1, z1: z1, t2: t2, z2: z2 };
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    // 如果找到了剧本，写入记忆中供后续选择
                                    if (bestPlan) {
                                        player.storage.ms_didong_ai_plan = bestPlan;
                                        // 如果正在挨打/濒死，哪怕得分是负的（会失去技能），为了活命也要用！
                                        if (isCritical) return 2;
                                        // 如果只是一般时刻出牌，只有当交换能带来极大优势（正收益）时，AI才会主动用
                                        if (bestScore > 0) return 1;
                                    }
                                    return 0; // 都不满足，默默关闭技能
                                }
                            }
                        },
                        subSkill: {
                            backup: {
                                filterCard: function () { return false; },
                                selectCard: -1,
                                log: false,
                                skill_id: "ms_didong_backup",
                                sub: true,
                                sourceSkill: "ms_didong"
                            }
                        },
                        onremove: function (player) {
                            delete player.storage.ms_didong_diff;
                        }
                    },


                    // ================= 3. 赎光 =================
                    "ms_shuguang": {
                        audio: 2,
                        enable: "phaseUse",
                        limited: true,
                        mark: true,
                        filter: function (event, player) {
                            return !player.storage.ms_shuguang_used;
                        },
                        content: function () {
                            "step 0"
                            player.chooseTarget('赎光：选择一名其他角色结为羁绊，互相可修改对方的判定牌', function (card, p, target) {
                                return target !== player;
                            }).set('ai', function (target) {
                                // 基础面板高亮：现在优先高亮敌人
                                return get.attitude(_status.event.player, target) < 0 ? 1 : 0;
                            });

                            "step 1"
                            if (result.bool && result.targets && result.targets.length) {
                                var target = result.targets[0];
                                player.logSkill('ms_shuguang', target);

                                // 划掉限定技
                                player.storage.ms_shuguang_used = true;
                                player.awakenSkill('ms_shuguang');

                                // 记录羁绊目标
                                player.storage.ms_shuguang_target = target;

                                // 给自己挂载全局的改判监听和阵亡恢复监听
                                player.addSkill('ms_shuguang_rejudge');
                                player.addSkill('ms_shuguang_restore');
                                game.log(player, '与', target, '结为羁绊，互相可更改对方的判定牌');
                            }
                        },
                        // ==========================================
                        // 🤖 曙光发动 AI 逻辑：进攻型判官寻猎
                        // ==========================================
                        ai: {
                            order: 8,
                            result: {
                                player: 1,
                                target: function (player, target) {
                                    var att = get.attitude(player, target);

                                    // 【核心战术】：专门连敌人，为了后续配合【天意】的闪电核爆！
                                    if (att < 0) {
                                        var score = 5;

                                        // 1. 如果这个敌人判定区正好已经有延时锦囊/蓄谋了，赶紧连，直接送他上路
                                        if (target.countCards('j') > 0) score += 3;

                                        // 2. 挑软柿子捏：优先连手牌少的敌人。
                                        // 这样他既没有牌能防你的闪电改判，也没有牌能报复性地改你的判定！
                                        var enemyCards = target.countCards('he');
                                        if (enemyCards <= 2) {
                                            score += 3; // 几乎没牌，完美猎物
                                        } else {
                                            score -= enemyCards * 0.5; // 牌太多可能有防备，降分
                                        }

                                        return score;
                                    }

                                    // 如果是队友：现在完全放弃常规保人策略（太亏节奏）。
                                    // 除非队友头上正顶着【闪电】快要爆炸了，才勉强连一下去救命。
                                    if (att > 0 && target.hasJudge('shandian')) {
                                        return 2;
                                    }

                                    return 0; // 其他情况一律不选
                                }
                            }
                        }
                    },
                    "ms_shuguang_rejudge": {
                        charlotte: true,
                        trigger: { global: "judge" },
                        direct: true,
                        filter: function (event, player) {
                            var target = player.storage.ms_shuguang_target;
                            if (!target || !target.isIn()) return false;

                            // 如果是自己判定，对方必须有手牌或装备牌才能改
                            if (event.player === player && target.countCards('he') > 0) return true;
                            // 如果是对方判定，自己必须有手牌或装备牌才能改
                            if (event.player === target && player.countCards('he') > 0) return true;

                            return false;
                        },
                        content: function () {
                            "step 0"
                            var judger = trigger.player;
                            var changer = (judger === player) ? player.storage.ms_shuguang_target : player;
                            event.changer = changer;

                            var promptStr = '赎光：' + get.translation(judger) + '的' + (trigger.judgestr || '') + '判定为' + get.translation(judger.judging[0]) + '，是否打出一张牌更改其判定结果？';

                            changer.chooseCard(promptStr, 'he', function (card, p, e) {
                                var mod2 = game.checkMod(card, p, 'unchanged', 'cardEnabled2', p);
                                if (mod2 != 'unchanged') return mod2;
                                var mod = game.checkMod(card, p, 'unchanged', 'cardRespondable', p);
                                if (mod != 'unchanged') return mod;
                                return true;
                            }).set('ai', function (card) {
                                var trigger = _status.event.getTrigger();
                                var changer = _status.event.player;
                                var judger = trigger.player;
                                var judging = judger.judging[0];

                                // 1. 算出新旧两张牌的判定底层得分
                                var scoreNew = trigger.judge(card);       // 比如你手里的黑桃2，能劈中，得分为 -2
                                var scoreOld = trigger.judge(judging);    // 比如当前判定区红桃5，安全，得分为 0
                                var diff = scoreNew - scoreOld;           // 收益差为 -2

                                var attitude = get.attitude(changer, judger);
                                if (attitude === 0 || diff === 0) return 0;

                                // 【核心修正】：必须放大判定收益的权重！
                                // 造成3点伤害的核爆收益极大，我们将判定分差强行乘 15 倍。
                                if (attitude > 0) {
                                    // 帮队友（越改越好）：diff 必须 > 0
                                    return diff * 15 - get.value(card);
                                } else {
                                    // 坑敌人（越改越坏）：diff 必须 < 0
                                    // 对于闪电：diff = -2，-diff * 15 = 30。 30 减去任何神装价值（撑死10分）都远大于0！
                                    // AI 哪怕拆自己手里的连弩、桃子，都会果断砸下去劈死他！
                                    return -diff * 15 - get.value(card);
                                }
                            });

                            "step 1"
                            if (result.bool && result.cards && result.cards.length) {
                                var changer = event.changer;
                                changer.logSkill('ms_shuguang', trigger.player);
                                changer.respond(result.cards, 'ms_shuguang', 'highlight', 'noOrdering');

                                if (trigger.player.judging[0].clone) {
                                    trigger.player.judging[0].clone.classList.remove('thrownhighlight');
                                    game.broadcast(function (card) {
                                        if (card.clone) card.clone.classList.remove('thrownhighlight');
                                    }, trigger.player.judging[0]);
                                    game.addVideo('deletenode', changer, get.cardsInfo([trigger.player.judging[0].clone]));
                                }

                                game.cardsDiscard(trigger.player.judging[0]);
                                trigger.player.judging[0] = result.cards[0];
                                trigger.orderingCards.addArray(result.cards);
                                game.log(trigger.player, '的判定牌改为', result.cards[0]);
                                game.delay(2);
                            }
                        },
                        ai: {
                            rejudge: true,
                            tag: {
                                rejudge: 1,
                            }
                        }
                    },
                    "ms_shuguang_restore": {
                        charlotte: true,
                        trigger: { global: "dieAfter" },
                        forced: true,
                        silent: true,
                        filter: function (event, player) {
                            return event.player === player.storage.ms_shuguang_target;
                        },
                        content: function () {
                            player.storage.ms_shuguang_used = false;
                            player.restoreSkill('ms_shuguang');
                            delete player.storage.ms_shuguang_target;
                            player.removeSkill('ms_shuguang_rejudge');
                            player.removeSkill('ms_shuguang_restore');
                            game.log(player, '的羁绊目标阵亡，恢复了限定技', '#g【赎光】');
                        }
                    },

                    // ================= 古河渚 =================

                    // ================= 1. 遗腹 =================
                    "ms_yifu": {
                        audio: 2,
                        trigger: { player: "damageAfter" },
                        forced: true,
                        mark: true,
                        intro: {
                            name: "遗腹 (层数)",
                            content: function (storage, player) {
                                var nature = player.storage.ms_yifu_nature || 0;
                                var normal = player.storage.ms_yifu_normal || 0;
                                return "等待【属性】伤害触发：<b><font color='red'>" + nature + "</font></b> 层<br>" +
                                    "等待【非属性】伤害触发：<b><font color='blue'>" + normal + "</font></b> 层";
                            }
                        },
                        content: function () {
                            // 判断伤害类型，存在 nature 属性即为属性伤害
                            var isNature = trigger.nature ? true : false;

                            if (isNature) {
                                // 受到属性伤害：
                                // 1. 触发等待中的属性层数
                                var pendingNature = player.storage.ms_yifu_nature || 0;
                                if (pendingNature > 0) {
                                    player.draw(3 * pendingNature);
                                    player.storage.ms_yifu_nature = 0; // 清空层数
                                    game.log(player, '触发了', '#g【遗腹】', '，摸了', 3 * pendingNature, '张牌');
                                }
                                // 2. 累加下一次非属性伤害的层数
                                if (!player.storage.ms_yifu_normal) player.storage.ms_yifu_normal = 0;
                                player.storage.ms_yifu_normal++;
                                game.log(player, '累加了1层', '#b等待非属性伤害', '的【遗腹】标记');
                            } else {
                                // 受到非属性伤害：
                                // 1. 触发等待中的非属性层数
                                var pendingNormal = player.storage.ms_yifu_normal || 0;
                                if (pendingNormal > 0) {
                                    player.draw(3 * pendingNormal);
                                    player.storage.ms_yifu_normal = 0; // 清空层数
                                    game.log(player, '触发了', '#g【遗腹】', '，摸了', 3 * pendingNormal, '张牌');
                                }
                                // 2. 累加下一次属性伤害的层数
                                if (!player.storage.ms_yifu_nature) player.storage.ms_yifu_nature = 0;
                                player.storage.ms_yifu_nature++;
                                game.log(player, '累加了1层', '#r等待属性伤害', '的【遗腹】标记');
                            }
                            player.markSkill('ms_yifu'); // 刷新UI面板
                        }
                    },


                    // ================= 2. 金烬 =================
                    "ms_jinjin": {
                        audio: 2,
                        enable: "phaseUse",
                        mark: true,
                        // 【AI 注入】：主动技能的 AI 判定逻辑
                        // ... （其他部分不变）
                        // 【AI 注入】：主动技能的 AI 判定逻辑
                        ai: {
                            order: 7.5,
                            result: {
                                target: function (player, target) {
                                    var isYin = player.storage.ms_jinjin;

                                    if (isYin) {
                                        // 【阴】形态：令目标对你使用火攻。
                                        var targetHandCount = target.countCards('h');

                                        // 1. 绝杀位：敌人没手牌，碰瓷必成功，白嫖1点伤害。权重给到极高（-15）
                                        if (targetHandCount === 0) return -15;

                                        // 2. 优势位：敌人手牌很少（1~2张），很难凑出同花色，碰瓷成功率高。
                                        if (targetHandCount <= 2) return -10;

                                        // 3. 劣势位：敌人手牌多，自己又是残血，极容易玩火自焚。绝对不发动。
                                        if (player.hp <= 1 && targetHandCount >= 3) return 0;

                                        // 一般情况，略微试探（权重给 -5，比普通出牌优先级稍低，但有空闲时会发动）
                                        return -5;

                                    } else {
                                        // 【阳】形态：你对目标使用火攻。
                                        var playerHandCount = player.countCards('h');

                                        // 1. 自杀位：自己没手牌，火攻必失败自己必掉血。绝对不发动！
                                        if (playerHandCount === 0) return 0;

                                        // 统计自己手牌拥有的花色数量
                                        var hs = player.getCards('h');
                                        var suits = [];
                                        for (var i = 0; i < hs.length; i++) {
                                            var suit = get.suit(hs[i]);
                                            if (suit && !suits.includes(suit)) {
                                                suits.push(suit);
                                            }
                                        }

                                        // 2. 优势位：手牌花色极其丰富（3~4种），几乎稳赚，大胆去烧。权重拉满（-12）
                                        if (suits.length >= 3) return -12;

                                        // 3. 均势位：有 2 种花色，有一定把握（-8）
                                        if (suits.length === 2) return -8;

                                        // 4. 劣势位：只有 1 种花色，极容易被反噬。
                                        if (suits.length === 1) {
                                            // 除非自己血量健康且敌人只剩 1 血，搏一搏单车变摩托，否则放弃发动。
                                            if (player.hp >= 3 && target.hp === 1) return -6;
                                            return 0;
                                        }
                                    }
                                }
                            }
                        },
                        // ... （其他部分不变）
                        intro: {
                            name: "金烬 (状态)",
                            content: function (storage, player) {
                                return player.storage.ms_jinjin ?
                                    "当前为<b><font color='blue'>【阴】</font></b>形态<br>可令一名其他角色对你使用【火攻】" :
                                    "当前为<b><font color='red'>【阳】</font></b>形态<br>可对一名其他角色使用【火攻】";
                            }
                        },
                        filterTarget: function (card, player, target) {
                            if (player === target) return false;
                            var isYin = player.storage.ms_jinjin; // true 为阴，false 为阳
                            if (isYin) {
                                // 阴：对方对你用，检查对方能否对你用火攻
                                return target.canUse({ name: 'huogong', isCard: true }, player);
                            } else {
                                // 阳：你对对方用，检查你能否对对方用火攻
                                return player.canUse({ name: 'huogong', isCard: true }, target);
                            }
                        },
                        content: function () {
                            var isYin = player.storage.ms_jinjin;

                            // 翻转转换技状态
                            player.storage.ms_jinjin = !isYin;
                            player.markSkill('ms_jinjin');

                            // 创建打上了专属追踪标记的虚拟火攻卡
                            var vcard = { name: 'huogong', isCard: true, ms_jinjin_card: true };

                            if (isYin) {
                                // 阴：目标对你使用
                                game.log(player, '发动了', '#g【金烬】', '，令', target, '对其使用一张【火攻】');
                                target.useCard(vcard, player);
                            } else {
                                // 阳：你对目标使用
                                game.log(player, '发动了', '#g【金烬】', '，视为对', target, '使用一张【火攻】');
                                player.useCard(vcard, target);
                            }

                            // 挂载全局监听技能，用于捕捉后续是否有伤害产生
                            player.addTempSkill('ms_jinjin_tracker');
                        },
                        group: ["ms_jinjin_damage_tracker"] // 内置的伤害检测器
                    },
                    "ms_jinjin_tracker": {
                        charlotte: true,
                        trigger: { global: "useCardAfter" },
                        forced: true,
                        popup: false,
                        filter: function (event, player) {
                            // 捕捉那张带有追踪标记的虚拟火攻结算完毕
                            return event.card && event.card.ms_jinjin_card;
                        },
                        content: function () {
                            var card = trigger.card;
                            // 如果在火攻过程中没有产生任何伤害（被无懈了、没展示出牌、或者弃置了同花色）
                            if (!card.ms_jinjin_damage_dealt) {
                                var user = trigger.player; // 火攻的使用者
                                var target = trigger.targets[0]; // 火攻的被使用者
                                if (user && target && user.isAlive() && target.isAlive()) {
                                    game.log(card, '结算完毕且未造成伤害，触发', '#g【金烬】', '反噬');
                                    // 【核心修正】：user.damage(1, target) 意为 user 受到来自 target 的 1 点伤害
                                    // 完美符合“被使用者对使用者造成1点伤害”
                                    user.damage(1, target);
                                }
                            }
                        }
                    },
                    "ms_jinjin_damage_tracker": {
                        charlotte: true,
                        // 无论谁受到伤害，只要伤害来源的那张牌是我们的追踪卡，就打上“已造成伤害”的标记
                        trigger: { global: "damageBegin" },
                        forced: true,
                        silent: true,
                        filter: function (event, player) {
                            return event.card && event.card.ms_jinjin_card;
                        },
                        content: function () {
                            trigger.card.ms_jinjin_damage_dealt = true;
                        }
                    },

                    // ================= 坂上智代 =================
                    // ================= 夺嫡（法正眩惑 完美不循环版） =================
                    "ms_duodi": {
                        audio: 2,
                        enable: "phaseUse",
                        multitarget: true, // 【核心修复点】：禁止引擎自动循环！只结算一次！
                        // 1. 要求玩家选择两张手牌
                        filterCard: function (card, player) {
                            return true;
                        },
                        selectCard: 2,
                        position: 'h',
                        // 2. 要求玩家选择两名其他角色
                        filterTarget: function (card, player, target) {
                            return target !== player;
                        },
                        selectTarget: 2,
                        filter: function (event, player) {
                            return player.countCards('h') >= 2;
                        },
                        prompt: "请选择两张手牌分别交给两名角色，令他们依次选择：对对方使用【杀】或受到你的1点伤害",
                        content: function () {
                            "step 0"
                            // 发放第一张牌
                            player.give([cards[0]], targets[0]);

                            "step 1"
                            // 发放第二张牌
                            player.give([cards[1]], targets[1]);

                            "step 2"
                            game.log(player, '将两张牌分别交给了', targets[0], '与', targets[1]);

                            "step 3"
                            // === 目标 A 的抉择 ===
                            if (targets[0].isIn() && targets[1].isIn()) {
                                // 呼出标准的“借刀杀人”面板，加上 targetRequired 防止空选
                                targets[0].chooseToUse('夺嫡：对 ' + get.translation(targets[1]) + ' 使用一张【杀】，或受到 ' + get.translation(player) + ' 的1点伤害', { name: 'sha' }, targets[1], -1).set('ai', function (card) {
                                    var target = _status.event.duodi_target;
                                    var current = _status.event.player;
                                    var att = get.attitude(current, target);
                                    if (att < 0) return get.value(card);
                                    if (current.hp <= 1) return get.value(card);
                                    return 0;
                                }).set('duodi_target', targets[1]).set('targetRequired', true);
                            } else {
                                // 目标不存在，直接跳过 A 的结算
                                event.goto(5);
                            }

                            "step 4"
                            // 如果 A 刚才点选了取消（或没有杀、距离不够），则受到伤害
                            if (!result.bool) {
                                targets[0].damage(1, player);
                            }

                            "step 5"
                            // === 目标 B 的抉择 ===
                            if (targets[1].isIn() && targets[0].isIn()) {
                                targets[1].chooseToUse('夺嫡：对 ' + get.translation(targets[0]) + ' 使用一张【杀】，或受到 ' + get.translation(player) + ' 的1点伤害', { name: 'sha' }, targets[0], -1).set('ai', function (card) {
                                    var target = _status.event.duodi_target;
                                    var current = _status.event.player;
                                    var att = get.attitude(current, target);
                                    if (att < 0) return get.value(card);
                                    if (current.hp <= 1) return get.value(card);
                                    return 0;
                                }).set('duodi_target', targets[0]).set('targetRequired', true);
                            } else {
                                // 若其中一人已死，提前终结技能
                                event.finish();
                            }

                            "step 6"
                            // 如果 B 点选了取消（或无法使用杀），则受到伤害
                            if (!result.bool) {
                                targets[1].damage(1, player);
                            }
                        },
                        ai: {
                            order: 7,
                            result: {
                                target: function (player, target) {
                                    return -1;
                                }
                            }
                        }
                    },
                    // ================= 2. 凝众及其附属技能 =================
                    "ms_ningzhong": {
                        audio: 2,
                        trigger: { global: "roundStart" },
                        forced: true,
                        locked: true,
                        filter: function (event, player) {
                            return game.roundNumber === 1 && !player.storage.ms_ningzhong_triggered;
                        },
                        content: function () {
                            "step 0"
                            player.storage.ms_ningzhong_triggered = true;
                            player.chooseTarget('凝众：请选择一名角色获得【破军】', 1, true).set('ai', function (target) {
                                return get.attitude(_status.event.player, target) > 0 ? 1 : 0;
                            });

                            "step 1"
                            if (result.bool && result.targets) {
                                event.target1 = result.targets[0];
                                event.target1.addSkill('ms_pojun');

                                if (!event.target1.storage.ms_ningzhong_skills) event.target1.storage.ms_ningzhong_skills = [];
                                event.target1.storage.ms_ningzhong_skills.push('ms_pojun');
                                game.log(event.target1, '从', player, '获得了衍生技能', '#g【破军】');
                            }

                            "step 2"
                            player.chooseTarget('凝众：请选择另一名不同的角色获得【界铁骑】', 1, function (card, p, target) {
                                return target !== _status.event.t1;
                            }, true).set('t1', event.target1).set('ai', function (target) {
                                return get.attitude(_status.event.player, target) > 0 ? 1 : 0;
                            });

                            "step 3"
                            if (result.bool && result.targets) {
                                event.target2 = result.targets[0];
                                event.target2.addSkill('ms_tieji');

                                if (!event.target2.storage.ms_ningzhong_skills) event.target2.storage.ms_ningzhong_skills = [];
                                event.target2.storage.ms_ningzhong_skills.push('ms_tieji');
                                game.log(event.target2, '从', player, '获得了衍生技能', '#g【界铁骑】');
                            }

                            "step 4"
                            player.addSkill('ms_ningzhong_shift');
                        }
                    },
                    "ms_ningzhong_shift": {
                        charlotte: true,
                        trigger: { global: "dieAfter" },
                        forced: true,
                        silent: true,
                        filter: function (event, player) {
                            return event.player.storage.ms_ningzhong_skills && event.player.storage.ms_ningzhong_skills.length > 0;
                        },
                        content: function () {
                            "step 0"
                            event.skills_to_shift = trigger.player.storage.ms_ningzhong_skills.slice(0);
                            trigger.player.storage.ms_ningzhong_skills = [];

                            event.current_skill = event.skills_to_shift.shift();

                            "step 1"
                            player.chooseTarget('凝众：请选择一名存活角色获得阵亡者的【' + get.translation(event.current_skill) + '】', 1, function (card, p, target) {
                                return target.isAlive();
                            }, true).set('ai', function (target) {
                                return get.attitude(_status.event.player, target);
                            });

                            "step 2"
                            if (result.bool && result.targets && result.targets.length) {
                                var target = result.targets[0];
                                target.addSkill(event.current_skill);

                                if (!target.storage.ms_ningzhong_skills) target.storage.ms_ningzhong_skills = [];
                                target.storage.ms_ningzhong_skills.push(event.current_skill);

                                game.log(target, '从阵亡的', trigger.player, '处继承了技能', '#g【' + get.translation(event.current_skill) + '】');
                            }

                            "step 3"
                            if (event.skills_to_shift.length > 0) {
                                event.current_skill = event.skills_to_shift.shift();
                                event.goto(1);
                            }
                        }
                    },

                    // ================= 3. 附属技能：铁骑与破军 =================
                    "ms_tieji": {
                        shaRelated: true,
                        audio: 2,
                        audioname: ["boss_lvbu3"],
                        trigger: { player: "useCardToPlayered" },
                        check: function (event, player) {
                            return get.attitude(player, event.target) <= 0;
                        },
                        filter: function (event, player) {
                            return event.card.name == 'sha';
                        },
                        logTarget: "target",
                        content: function () {
                            "step 0"
                            player.judge(function () { return 0; });
                            if (!trigger.target.hasSkill('fengyin')) {
                                trigger.target.addTempSkill('fengyin');
                            }
                            "step 1"
                            var suit = result.suit;
                            var target = trigger.target;
                            var num = target.countCards('h', 'shan');
                            target.chooseToDiscard('请弃置一张' + get.translation(suit) + '牌，否则不能使用闪抵消此杀', 'he', function (card) {
                                return get.suit(card) == _status.event.suit;
                            }).set('ai', function (card) {
                                var num = _status.event.num;
                                if (num == 0) return 0;
                                if (card.name == 'shan') return num > 1 ? 2 : 0;
                                return 8 - get.value(card);
                            }).set('num', num).set('suit', suit);
                            "step 2"
                            if (!result.bool) {
                                trigger.getParent().directHit.add(trigger.target);
                            }
                        },
                        ai: {
                            ignoreSkill: true,
                            skillTagFilter: function (player, tag, arg) {
                                if (tag == 'directHit_ai') {
                                    return get.attitude(player, arg.target) <= 0;
                                }
                                if (!arg || arg.isLink || !arg.card || arg.card.name != 'sha') return false;
                                if (!arg.target || get.attitude(player, arg.target) >= 0) return false;
                                if (!arg.skill || !lib.skill[arg.skill] || lib.skill[arg.skill].charlotte || get.is.locked(arg.skill) || !arg.target.getSkills(true, false).includes(arg.skill)) return false;
                            },
                            "directHit_ai": true,
                        }
                    },
                    "ms_pojun": {
                        shaRelated: true,
                        trigger: { player: "useCardToPlayered" },
                        direct: true,
                        filter: function (event, player) {
                            // 【核心修复】：移除了 player.isPhaseUsing() 限制！
                            // 这样在别人的回合（如智代的夺嫡）被逼迫出杀时，也能完美触发破军了！
                            return event.card.name == 'sha' && event.target.hp > 0 && event.target.countCards('he') > 0;
                        },
                        audio: 2,
                        content: function () {
                            'step 0'
                            player.choosePlayerCard(trigger.target, 'he', [1, Math.min(trigger.target.countCards('he'), trigger.target.hp)], get.prompt('ms_pojun', trigger.target)).set('forceAuto', true);
                            'step 1'
                            if (result.bool && result.links && result.links.length) {
                                var target = trigger.target;
                                player.logSkill('ms_pojun', target);
                                // 【修复提取错误】：修复了原版代码提取结果数组名称不一致的bug（result.cards -> result.links）
                                target.addToExpansion(result.links, 'giveAuto', player).gaintag.add('ms_pojun_back');
                                target.addSkill('ms_pojun_back');
                            }
                        },
                        ai: {
                            "unequip_ai": true,
                            "directHit_ai": true,
                            skillTagFilter: function (player, tag, arg) {
                                if (get.attitude(player, arg.target) > 0) return false;
                                if (tag == 'directHit_ai') return arg.target.hp >= Math.max(1, arg.target.countCards('h') - 1);
                                if (arg && arg.name == 'sha' && arg.target.getEquip(2)) return true;
                                return false;
                            },
                        }
                    },
                    "ms_pojun_back": {
                        charlotte: true,
                        trigger: { global: "phaseJieshuBegin" }, // 确保在当前玩家回合结束时物归原主
                        forced: true,
                        silent: true,
                        content: function () {
                            var cards = player.getExpansions('ms_pojun_back');
                            if (cards.length) {
                                player.gain(cards, 'gain2');
                            }
                            player.removeSkill('ms_pojun_back');
                        }
                    },

                    // ================= 库特 =================
                    "ms_qiuzhi": {
                        audio: 2,
                        trigger: { global: "useCard2" },
                        direct: true,
                        // 【AI 注入】：因为是 direct 技能，加入 check 函数进行前置大脑运算
                        check: function (event, player) {
                            var actual_targets = event.targets;
                            var cards = player.getCards('h');

                            // AI 在脑海中预演每一张牌如果弃置，能带来多大收益
                            for (var i = 0; i < cards.length; i++) {
                                var card = cards[i];
                                var legal_targets = game.filterPlayer(function (current) {
                                    return player.canUse(card, current);
                                });

                                // 预演重合计算
                                var overlap = [];
                                for (var j = 0; j < actual_targets.length; j++) {
                                    if (legal_targets.includes(actual_targets[j]) && !overlap.includes(actual_targets[j])) {
                                        overlap.push(actual_targets[j]);
                                    }
                                }
                                var exact_match = (overlap.length === actual_targets.length && overlap.length === legal_targets.length && actual_targets.length > 0);

                                var union = [];
                                for (var j = 0; j < actual_targets.length; j++) if (!union.includes(actual_targets[j])) union.push(actual_targets[j]);
                                for (var j = 0; j < legal_targets.length; j++) if (!union.includes(legal_targets[j])) union.push(legal_targets[j]);
                                var complementary = (overlap.length === 0 && union.length === game.countPlayer());

                                var score = 0;
                                if (complementary) {
                                    score += 8; // 摸两张牌的基础巨大收益
                                    for (var j = 0; j < actual_targets.length; j++) {
                                        if (get.attitude(player, actual_targets[j]) < 0) score += 6; // 砸敌人血，极好
                                        else if (get.attitude(player, actual_targets[j]) > 0) score -= 8; // 砸队友血，极差
                                    }
                                } else if (exact_match) {
                                    for (var j = 0; j < overlap.length; j++) {
                                        if (get.attitude(player, overlap[j]) < 0) score += 5; // 偷敌人，血赚
                                    }
                                } else if (overlap.length > 0) {
                                    for (var j = 0; j < overlap.length; j++) {
                                        if (get.attitude(player, overlap[j]) < 0) score += 3.5; // 拆敌人，还行
                                    }
                                }

                                // 如果某张牌带来的综合收益大于这张牌本身的价值，这波就值得干
                                if (score > get.value(card)) return true;
                            }
                            return false;
                        },
                        filter: function (event, player) {
                            var type = get.type(event.card);
                            var name = event.card.name;

                            // 1. 必须是基本牌或普通锦囊牌（无子类型）
                            if (type !== 'basic' && (type !== 'trick' || event.card.subtype)) return false;

                            // 2. 必须排除【闪】和【无懈可击】
                            if (name === 'shan' || name === 'wuxie') return false;

                            // 3. 目标必须包含与自己距离 <= 1 的角色
                            if (!event.targets || event.targets.length === 0) return false;
                            var has_close_target = false;
                            for (var i = 0; i < event.targets.length; i++) {
                                if (get.distance(player, event.targets[i]) <= 1) {
                                    has_close_target = true;
                                    break;
                                }
                            }
                            if (!has_close_target) return false;

                            // 4. 手里必须有牌可以弃置
                            return player.countCards('h') > 0;
                        },
                        content: function () {
                            "step 0"
                            player.chooseToDiscard('h', 1, '求知：你可以弃置一张手牌，比对该牌合法目标与实际目标').set('ai', function (card) {
                                // 【AI 注入】：精准选牌逻辑，按照 5~15 的权重尺子选出最优解
                                var player = _status.event.player;
                                var actual_targets = trigger.targets;
                                var legal_targets = game.filterPlayer(function (current) {
                                    return player.canUse(card, current);
                                });

                                var overlap = [];
                                for (var i = 0; i < actual_targets.length; i++) {
                                    if (legal_targets.includes(actual_targets[i]) && !overlap.includes(actual_targets[i])) {
                                        overlap.push(actual_targets[i]);
                                    }
                                }

                                var exact_match = (overlap.length === actual_targets.length && overlap.length === legal_targets.length && actual_targets.length > 0);

                                var union = [];
                                for (var i = 0; i < actual_targets.length; i++) if (!union.includes(actual_targets[i])) union.push(actual_targets[i]);
                                for (var i = 0; i < legal_targets.length; i++) if (!union.includes(legal_targets[i])) union.push(legal_targets[i]);
                                var complementary = (overlap.length === 0 && union.length === game.countPlayer());

                                var score = 0;
                                if (complementary) {
                                    score += 8;
                                    for (var i = 0; i < actual_targets.length; i++) {
                                        if (get.attitude(player, actual_targets[i]) < 0) score += 6;
                                        else if (get.attitude(player, actual_targets[i]) > 0) score -= 8;
                                    }
                                } else if (exact_match) {
                                    for (var i = 0; i < overlap.length; i++) {
                                        if (get.attitude(player, overlap[i]) < 0) score += 5;
                                        else if (get.attitude(player, overlap[i]) > 0) score -= 5;
                                    }
                                } else if (overlap.length > 0) {
                                    for (var i = 0; i < overlap.length; i++) {
                                        if (get.attitude(player, overlap[i]) < 0) score += 3.5;
                                        else if (get.attitude(player, overlap[i]) > 0) score -= 3.5;
                                    }
                                }

                                var netValue = score - get.value(card);

                                // 净收益大于0，则将得分强力映射到 5~15 的区间，确保 AI 抢着出
                                if (netValue > 0) {
                                    return Math.min(15, 5 + netValue);
                                }
                                return 0;
                            });

                            "step 1"
                            if (result.bool && result.cards && result.cards.length > 0) {
                                var card = result.cards[0];
                                player.logSkill('ms_qiuzhi');

                                var actual_targets = trigger.targets.slice();

                                var legal_targets = game.filterPlayer(function (current) {
                                    return player.canUse(card, current);
                                });

                                var overlap = [];
                                for (var i = 0; i < actual_targets.length; i++) {
                                    if (legal_targets.includes(actual_targets[i]) && !overlap.includes(actual_targets[i])) {
                                        overlap.push(actual_targets[i]);
                                    }
                                }

                                var exact_match = (overlap.length === actual_targets.length && overlap.length === legal_targets.length && actual_targets.length > 0);

                                var union = [];
                                for (var i = 0; i < actual_targets.length; i++) if (!union.includes(actual_targets[i])) union.push(actual_targets[i]);
                                for (var i = 0; i < legal_targets.length; i++) if (!union.includes(legal_targets[i])) union.push(legal_targets[i]);
                                var complementary = (overlap.length === 0 && union.length === game.countPlayer());

                                event.qiuzhi_targets = overlap.slice();
                                event.exact_match = exact_match;
                                event.complementary = complementary;
                                event.actual_targets = actual_targets;
                            } else {
                                event.finish();
                            }

                            "step 2"
                            if (event.qiuzhi_targets && event.qiuzhi_targets.length > 0 && !event.complementary) {
                                event.current_target = event.qiuzhi_targets.shift();
                                if (event.current_target.isIn() && event.current_target.countCards('he') > 0) {
                                    if (event.exact_match) {
                                        player.gainPlayerCard(event.current_target, 'he', 1);
                                    } else {
                                        player.discardPlayerCard(event.current_target, 'he', 1, 'visible');
                                    }
                                }
                                event.redo();
                            }

                            "step 3"
                            if (event.complementary) {
                                game.log(player, '触发了', '#g【求知】', '的互补效果！');
                                player.draw(2);
                                event.damage_targets = event.actual_targets.slice();
                            } else {
                                event.finish();
                            }

                            "step 4"
                            if (event.damage_targets && event.damage_targets.length > 0) {
                                var target = event.damage_targets.shift();
                                if (target.isIn()) {
                                    target.damage(1, player);
                                }
                                event.redo();
                            }
                        }
                    },

                    // ================= 2. 入险 =================
                    "ms_ruxian": {
                        audio: 2,
                        trigger: { global: "useCard2" },
                        direct: true,
                        // 【AI 注入】：判断是否值得进入判定（保底门槛）
                        check: function (event, player) {
                            var can_append = !player.isLinked() && game.hasPlayer(function (current) {
                                return !event.targets.includes(current) && lib.filter.targetEnabled2(event.card, event.player, current);
                            });
                            var can_remove = event.targets.length > 0;

                            // 至少有一个选项能满足，且如果要卖血取消，自己血量必须健康
                            return can_append || (can_remove && player.hp > 1);
                        },
                        filter: function (event, player) {
                            var type = get.type(event.card);
                            var name = event.card.name;

                            // 1. 必须是基本牌或普通锦囊牌（无子类型）
                            if (type !== 'basic' && (type !== 'trick' || event.card.subtype)) return false;

                            // 2. 必须排除【闪】和【无懈可击】
                            if (name === 'shan' || name === 'wuxie') return false;

                            // 3. 目标必须包含与自己距离 <= 1 的角色
                            if (!event.targets || event.targets.length === 0) return false;
                            var has_close_target = false;
                            for (var i = 0; i < event.targets.length; i++) {
                                if (get.distance(player, event.targets[i]) <= 1) {
                                    has_close_target = true;
                                    break;
                                }
                            }
                            if (!has_close_target) return false;

                            return true;
                        },
                        content: function () {
                            "step 0"
                            var choices = ['cancel2'];

                            var can_append = !player.isLinked() && game.hasPlayer(function (current) {
                                return !trigger.targets.includes(current) && lib.filter.targetEnabled2(trigger.card, trigger.player, current);
                            });

                            var can_remove = trigger.targets.length > 0;

                            if (can_append) choices.unshift('横置并追加目标');
                            if (can_remove) choices.unshift('受火伤并取消目标');

                            if (choices.length > 1) {
                                player.chooseControl(choices).set('prompt', '入险：是否修改 ' + get.translation(trigger.card) + ' 的目标？').set('ai', function () {
                                    // 【AI 注入】：极其精明的菜单选择运算
                                    var player = _status.event.player;

                                    // --- 计算追加目标的净收益 ---
                                    var append_score = 0;
                                    if (can_append) {
                                        var append_targets = game.filterPlayer(function (current) {
                                            return !trigger.targets.includes(current) && lib.filter.targetEnabled2(trigger.card, trigger.player, current);
                                        });
                                        // 按正向收益从大到小排
                                        append_targets.sort(function (a, b) {
                                            return get.effect(b, trigger.card, trigger.player, player) - get.effect(a, trigger.card, trigger.player, player);
                                        });

                                        // 取前两名的正向收益（必须为正才加）
                                        for (var i = 0; i < Math.min(2, append_targets.length); i++) {
                                            var eff = get.effect(append_targets[i], trigger.card, trigger.player, player);
                                            if (eff > 0) append_score += eff;
                                        }
                                        // 扣除横置自己的代价（一般权值为 3）
                                        append_score -= 3;
                                    }

                                    // --- 计算取消目标的净收益 ---
                                    var remove_score = 0;
                                    if (can_remove) {
                                        var remove_targets = trigger.targets.slice();
                                        // 找负面效果最大的目标（比如队友快被火杀砍死了）
                                        remove_targets.sort(function (a, b) {
                                            return get.effect(a, trigger.card, trigger.player, player) - get.effect(b, trigger.card, trigger.player, player);
                                        });

                                        // 取前两名最惨的目标，将其负数收益转正相加
                                        for (var i = 0; i < Math.min(2, remove_targets.length); i++) {
                                            var eff = get.effect(remove_targets[i], trigger.card, trigger.player, player);
                                            if (eff < 0) remove_score += Math.abs(eff);
                                        }

                                        // 扣除吃1点火伤的代价
                                        var dmgCost = 4;
                                        if (player.hp <= 1) dmgCost = 999; // 绝对不自杀
                                        if (player.isLinked()) dmgCost += 3; // 连环状态下自焚代价极高
                                        remove_score -= dmgCost;
                                    }

                                    // 比较哪个选择的净收益高
                                    if (append_score > 0 && append_score >= remove_score) return '横置并追加目标';
                                    if (remove_score > 0 && remove_score > append_score) return '受火伤并取消目标';

                                    return 'cancel2';
                                });
                            } else {
                                event.finish();
                            }

                            "step 1"
                            if (result.control === '横置并追加目标') {
                                player.logSkill('ms_ruxian');
                                player.chooseTarget('入险：请选择至多两个【追加】的目标', [1, 2], function (card, p, target) {
                                    return !trigger.targets.includes(target) && lib.filter.targetEnabled2(trigger.card, trigger.player, target);
                                }).set('ai', function (target) {
                                    // 【AI 注入】：大权重映射，确保选中好目标
                                    var eff = get.effect(target, trigger.card, trigger.player, _status.event.player);
                                    if (eff > 0) return 5 + eff * 2; // 例如收益为3，则返回 11
                                    return 0;
                                });
                                event.ruxian_type = 'add';
                            }
                            else if (result.control === '受火伤并取消目标') {
                                player.logSkill('ms_ruxian');
                                player.chooseTarget('入险：请选择至多两个要【取消】的目标', [1, 2], function (card, p, target) {
                                    return trigger.targets.includes(target);
                                }).set('ai', function (target) {
                                    // 【AI 注入】：大权重映射，确保捞走最应该救的目标
                                    var eff = get.effect(target, trigger.card, trigger.player, _status.event.player);
                                    if (eff < 0) return 5 + Math.abs(eff) * 2; // 例如收益为-3，则返回 11
                                    return 0;
                                });
                                event.ruxian_type = 'remove';
                            }
                            else {
                                event.finish();
                            }

                            "step 2"
                            if (result.bool && result.targets && result.targets.length > 0) {
                                if (event.ruxian_type === 'add') {
                                    player.link();
                                    trigger.targets.addArray(result.targets);
                                    game.log(player, '横置自己，为', trigger.card, '追加了目标', result.targets);
                                }
                                else if (event.ruxian_type === 'remove') {
                                    player.damage(1, 'fire', 'nosource');
                                    trigger.targets.removeArray(result.targets);
                                    game.log(player, '受到1点火属性伤害，为', trigger.card, '取消了目标', result.targets);
                                }
                            }
                        }
                    },
                    // ================= 怀愿 =================
                    // ================= 怀愿 =================
                    "ms_huaiyuan": {
                        audio: 2,
                        trigger: { player: "phaseBegin" },
                        forced: true,
                        content: function () {
                            "step 0"
                            // 1. 获取牌堆中剩余雷【杀】数量
                            var num = 0;
                            // 遍历物理牌堆节点，计算真正的剩余量
                            if (ui.cardPile && ui.cardPile.childNodes) {
                                for (var i = 0; i < ui.cardPile.childNodes.length; i++) {
                                    var card = ui.cardPile.childNodes[i];
                                    if (card.name === 'sha' && get.nature(card) === 'thunder') {
                                        num++;
                                    }
                                }
                            }
                            event.num = num;
                            game.log(player, '将体力与手牌调整至牌堆剩余', '#y雷【杀】', '数：', '#g' + num);

                            // 2. 调整体力（为了防止突破上限导致 UI 崩溃，同步把体力上限托底）
                            if (player.hp !== num) {
                                if (player.maxHp < num) player.maxHp = num;
                                player.hp = num;
                                player.update();
                            }

                            "step 1"
                            // 3. 调整手牌
                            var h_num = player.countCards('h');
                            var diff = h_num - event.num;

                            if (diff > 0) {
                                // 牌多了，强制弃置多出来的差值
                                player.chooseToDiscard('h', diff, true).set('prompt', '怀愿：你必须弃置 ' + diff + ' 张手牌以将手牌数调整至 ' + event.num);
                            } else if (diff < 0) {
                                // 牌少了，直接摸牌补齐差值
                                player.draw(-diff);
                            }
                        },
                        group: ["ms_huaiyuan_lose", "ms_huaiyuan_use"]
                    },
                    // ========= 子技能：其它角色失去雷杀受到伤害 =========
                    "ms_huaiyuan_lose": {
                        audio: 2,
                        // loseAfter 涵盖了卡牌的：主动丢弃、被拆顺拿走、以及使用打出（进入处理区）
                        trigger: { global: "loseAfter" },
                        forced: true,
                        filter: function (event, player) {
                            // 必须是其他角色，且其存活
                            if (event.player === player || !event.player || !event.player.isAlive()) return false;

                            // 检查其失去的卡牌里有没有雷杀
                            if (event.cards && event.cards.length) {
                                for (var i = 0; i < event.cards.length; i++) {
                                    if (event.cards[i].name === 'sha' && get.nature(event.cards[i]) === 'thunder') {
                                        return true;
                                    }
                                }
                            }
                            return false;
                        },
                        logTarget: "player",
                        content: function () {
                            // 对失去雷杀的角色造成2点雷属性伤害
                            trigger.player.damage(2, 'thunder', player);
                        }
                    },
                    // ========= 子技能：给雷杀抢牌 =========
                    "ms_huaiyuan_use": {
                        audio: 2,
                        enable: "phaseUse",
                        // 只允许选择手牌或装备区的雷杀作为发动代价
                        filterCard: function (card, player) {
                            return card.name === 'sha' && get.nature(card) === 'thunder';
                        },
                        selectCard: 1,
                        position: 'hes',
                        discard: false, // 我们要拿来给人，底层绝对不能把这张牌弃掉
                        lose: false,
                        delay: false,
                        // 每名角色限一次
                        filterTarget: function (card, player, target) {
                            return target !== player && !target.hasSkill('ms_huaiyuan_used');
                        },
                        check: function (card) {
                            return 8 - get.value(card);
                        },
                        content: function () {
                            "step 0"
                            // 给该目标挂载“本回合已发动”的限制标签
                            target.addTempSkill('ms_huaiyuan_used', 'phaseUseAfter');
                            // 用标准的 API 给牌（包含丢失、获得、动画的一整条龙操作）
                            player.give(cards, target);

                            "step 1"
                            // 如果他有牌可以抢
                            if (target.countCards('he') > 0) {
                                // 强制弹框让玩家从目标身上扒 2 张牌（装备或手牌）
                                player.choosePlayerCard(target, 'he', 2, true).set('prompt', '怀愿：获得目标两张牌');
                            } else {
                                event.finish();
                            }

                            "step 2"
                            if (result.bool && result.cards && result.cards.length) {
                                // 拿走选中的牌
                                player.gain(result.cards, target, 'giveAuto');
                            }
                        },
                        ai: {
                            order: 9, // 高优使用（用没用的雷杀骗两张敌人的牌，还能埋个雷）
                            result: {
                                target: function (player, target) {
                                    if (get.attitude(player, target) > 0) return 0;
                                    return -2; // 被夺走2牌，纯负收益
                                }
                            }
                        }
                    },
                    // 记录“每名角色限一次”的临时限制技
                    "ms_huaiyuan_used": {
                        charlotte: true
                    },

                    // ================= 神尾观铃=================
                    // ================= 1. 羽化 (分配与觉醒) =================
                    "ms_yuhua": {
                        // 挂载两个子模块：发牌模块、觉醒模块
                        group: ["ms_yuhua_distribute", "ms_yuhua_awaken"]
                    },
                    "ms_yuhua_distribute": {
                        audio: 2,
                        // 【核心改动】：利用无名杀最标准的原生写法
                        // player: "damageEnd" -> 受到伤害后
                        // source: "damageEnd" -> 造成伤害后
                        trigger: { player: ["phaseBegin", "damageEnd"], source: "damageEnd" },
                        direct: true,
                        filter: function (event, player) {
                            return true; // 只要是自己打人、挨打或者回合开始，直接无脑放行！
                        },
                        content: function () {
                            "step 0"
                            player.chooseBool('是否发动【羽化】展示牌堆顶的 ' + game.countPlayer() + ' 张牌并进行分配？').set('ai', function () { return true; });

                            "step 1"
                            if (result.bool) {
                                player.logSkill('ms_yuhua');
                                var count = game.countPlayer();
                                var cards = get.cards(count);

                                game.cardsGotoOrdering(cards);
                                game.log(player, '从牌堆顶亮出了', cards);

                                event.yuhua_cards = cards;
                                event.yuhua_targets = game.filterPlayer().sortBySeat();
                            } else {
                                event.finish();
                            }

                            "step 2"
                            if (event.yuhua_targets && event.yuhua_targets.length > 0) {
                                event.current_target = event.yuhua_targets.shift();
                                if (event.yuhua_cards.length > 0) {
                                    if (event.yuhua_cards.length === 1) {
                                        event.current_target.gain(event.yuhua_cards[0], 'gain2');
                                        event.yuhua_cards.shift();
                                        if (!player.storage.ms_yuhua_count) player.storage.ms_yuhua_count = 0;
                                        player.storage.ms_yuhua_count++;
                                        event.redo();
                                    } else {
                                        player.chooseButton(['请给 ' + get.translation(event.current_target) + ' 分配一张牌', event.yuhua_cards], true).set('ai', function (button) {
                                            return 1;
                                        });
                                    }
                                }
                            } else {
                                event.finish();
                            }

                            "step 3"
                            if (result && result.bool && result.links) {
                                var card = result.links[0];
                                event.current_target.gain(card, 'gain2');
                                event.yuhua_cards.remove(card);

                                if (!player.storage.ms_yuhua_count) player.storage.ms_yuhua_count = 0;
                                player.storage.ms_yuhua_count++;

                                event.goto(2);
                            }
                        }
                    },
                    "ms_yuhua_awaken": {
                        trigger: { player: "phaseZhunbeiBegin" }, // 准备阶段开始时检查觉醒
                        forced: true,
                        skillAnimation: true,
                        animationColor: "orange",
                        filter: function (event, player) {
                            if (player.hasSkill('ms_suyi')) return false; // 已经觉醒过了不触发

                            // 【核心修改点】：改为存活人数的 3 倍
                            var limit = game.countPlayer() * 3;

                            // 【核心修改点】：改为大于等于 (>=)
                            return player.storage.ms_yuhua_count && player.storage.ms_yuhua_count >= limit;
                        },
                        content: function () {
                            player.awakenSkill('ms_yuhua');
                            player.loseMaxHp(1); // 减一点体力上限
                            player.addSkill('ms_suyi'); // 获得溯忆
                            game.log(player, '完成了宿命的分配，成功觉醒并获得了', '#g【溯忆】');
                        }
                    },

                    // ================= 2. 溯忆 (神将盲盒) =================
                    "ms_suyi": {
                        audio: 2,
                        trigger: { player: "phaseUseBegin" },
                        forced: true,
                        filter: function (event, player) {
                            // 必须卡池里还有神将祝福才能触发
                            if (player.storage.ms_suyi_pool && player.storage.ms_suyi_pool.length === 0) return false;
                            return true;
                        },
                        content: function () {
                            "step 0"
                            // 初始化神将池（12个）
                            if (!player.storage.ms_suyi_pool) {
                                player.storage.ms_suyi_pool = [
                                    '神诸葛(摸七)', '神周瑜(业炎)', '神关羽(武神)', '神吕蒙(攻心)',
                                    '神赵云(龙魂)', '神吕布(神愤)', '神司马(连破)', '神曹操(归心)',
                                    '神陆逊(摧克)', '神刘备(咆哮)', '神甘宁(魄袭)', '神张辽(夺锐)'
                                ];
                            }

                            // 随机打乱卡池，抽出前四个，并在卡池中永久剔除这四个
                            player.storage.ms_suyi_pool.randomSort();
                            var options = player.storage.ms_suyi_pool.splice(0, 4);
                            event.suyi_options = options;

                            // 抽取第一个祝福
                            player.chooseControl(event.suyi_options).set('prompt', '溯忆：请选择你要获得的【第一个】神将祝福').set('ai', function () { return event.suyi_options[0]; });

                            "step 1"
                            event.blessing1 = result.control;
                            event.suyi_options.remove(result.control); // 选过的不能再选

                            // 抽取第二个祝福
                            player.chooseControl(event.suyi_options).set('prompt', '溯忆：请选择你要获得的【第二个】神将祝福').set('ai', function () { return event.suyi_options[0]; });

                            "step 2"
                            event.blessing2 = result.control;

                            // 获得祝福的通解逻辑
                            var blessings = [event.blessing1, event.blessing2];
                            event.suyi_blessings = blessings;

                            game.log(player, '在', '#g【溯忆】', '中获得了', '#y' + blessings[0], '与', '#y' + blessings[1]);

                            "step 3"
                            if (event.suyi_blessings.length > 0) {
                                var current_b = event.suyi_blessings.shift();

                                // 【终极替换：所有技能彻底摆脱底层依赖！】
                                if (current_b === '神诸葛(摸七)') player.draw(7);
                                if (current_b === '神周瑜(业炎)') player.addSkill('ms_suyi_yeyan');
                                if (current_b === '神关羽(武神)') player.addSkill('ms_suyi_wushen');
                                if (current_b === '神吕蒙(攻心)') player.addSkill('ms_suyi_gongxin');
                                if (current_b === '神赵云(龙魂)') player.addSkill('ms_suyi_longhun');
                                if (current_b === '神司马(连破)') player.addSkill('ms_suyi_lianpo');
                                if (current_b === '神曹操(归心)') player.addSkill('ms_suyi_guixin');
                                if (current_b === '神刘备(咆哮)') player.addSkill('paoxiao'); // 咆哮是标准包底层的标配，极其稳定，保留即可
                                if (current_b === '神甘宁(魄袭)') player.addSkill('ms_suyi_poxi');
                                if (current_b === '神张辽(夺锐)') player.addSkill('ms_suyi_duorui');
                                if (current_b === '神陆逊(摧克)') player.addSkill('ms_suyi_cuike');

                                // 特别处理：神吕布的核弹级群伤与弃牌
                                if (current_b === '神吕布(神愤)') {
                                    var next = game.createEvent('ms_suyi_slb_effect');
                                    next.player = player;
                                    next.setContent(function () {
                                        "step 0"
                                        event.targets = game.filterPlayer(function (current) { return current !== player; }).sortBySeat();
                                        "step 1"
                                        if (event.targets.length) {
                                            event.targets.shift().damage(1, player);
                                            event.redo(); // 逐个造成伤害
                                        }
                                        "step 2"
                                        event.targets = game.filterPlayer(function (current) { return current !== player; }).sortBySeat();
                                        "step 3"
                                        if (event.targets.length) {
                                            event.targets.shift().chooseToDiscard(4, 'he', true); // 逐个弃置四张牌
                                            event.redo();
                                        }
                                    });
                                }

                                event.redo(); // 循环处理第二个祝福
                            }
                        }
                    },

                    // ================= 3. 溯忆衍生技：新武神 =================
                    // ================= 武神 =================
                    "ms_suyi_wushen": {
                        audio: 2,
                        enable: "phaseUse",
                        filterCard: function (card) {
                            return get.color(card) === 'red'; // 任意红色牌
                        },
                        selectCard: [1, Infinity],
                        position: 'he',
                        filterTarget: function (card, player, target) {
                            // 只要目标身上没有“已受过武神”的标记，谁都可以选（包括自己）
                            return !target.hasSkill('ms_suyi_wushen_used');
                        },
                        selectTarget: 1,
                        prompt: "出牌阶段，每名角色限一次，你可以弃置任意张红色牌，对一名角色造成等量的伤害",
                        check: function (card) {
                            return 7 - get.value(card);
                        },
                        content: function () {
                            // 给该目标挂载“本阶段已受过武神”的标签
                            // 出牌阶段结束后（phaseUseAfter），这个标签会自动销毁！
                            target.addTempSkill('ms_suyi_wushen_used', 'phaseUseAfter');

                            // 弃置了几张牌，就造成几点伤害
                            target.damage(cards.length, player);
                        },
                        ai: {
                            order: 8,
                            result: {
                                target: function (player, target) {
                                    return -1;
                                }
                            }
                        }
                        // 【千万别加 group 属性！这只是个标记，不需要跟主技能打包！】
                    },

                    // ================= 武神（目标记录标） =================
                    "ms_suyi_wushen_used": {
                        charlotte: true // 静默技能，玩家不可见
                    },

                    // ================= 溯忆衍生技：神陆逊（摧克）=================
                    "ms_suyi_cuike": {
                        // 利用群组功能，将“出牌阶段各限一次”的两个独立效果绑在一起
                        group: ["ms_suyi_cuike_1", "ms_suyi_cuike_2"]
                    },
                    "ms_suyi_cuike_1": {
                        audio: 2,
                        enable: "phaseUse",
                        usable: 1, // 限一次
                        filterTarget: function (card, player, target) {
                            return target.countCards('he') > 0;
                        },
                        selectTarget: 2, // 选两个人
                        prompt: "摧克①：弃置两名角色各一张牌，然后横置这两名角色",
                        content: function () {
                            "step 0"
                            // 依次弃置他们的牌
                            player.discardPlayerCard(target, 'he', 1, true);
                            "step 1"
                            // 依次将他们横置
                            target.link();
                        },
                        ai: {
                            order: 6,
                            result: { target: -1 }
                        }
                    },
                    "ms_suyi_cuike_2": {
                        audio: 2,
                        enable: "phaseUse",
                        usable: 1, // 限一次
                        filterTarget: function (card, player, target) {
                            return true;
                        },
                        selectTarget: 1, // 选一个人
                        prompt: "摧克②：对一名角色造成1点火伤，并弃置其装备区内所有牌",
                        content: function () {
                            "step 0"
                            target.damage(1, 'fire', player);
                            "step 1"
                            // 瞬间清空防具/武器/坐骑
                            var equips = target.getCards('e');
                            if (equips.length > 0) target.discard(equips);
                        },
                        ai: {
                            order: 7,
                            result: { target: -2 }
                        }
                    },

                    // ================= 溯忆衍生技：神张辽（夺锐）=================
                    "ms_suyi_duorui": {
                        audio: 2,
                        trigger: { player: "phaseBegin" }, // 你的回合开始时触发
                        forced: true,
                        popup: false,
                        silent: true,
                        content: function () {
                            // 筛选全场除了自己以外的所有人
                            var targets = game.filterPlayer(function (current) { return current !== player; });
                            for (var i = 0; i < targets.length; i++) {
                                // 挂载 vanilla 原生的 "fengyin" 状态
                                // 这个状态就是底层专属的“非锁定技失效”，持续到自己回合结束（phaseAfter）
                                targets[i].addTempSkill('fengyin', { player: 'phaseAfter' });
                            }
                            game.log(player, '触发了', '#g【夺锐】', '的威慑，本回合所有其他角色的非锁定技失效！');
                        }
                    },

                    // ================= 溯忆衍生技：神甘宁（魄袭）=================
                    // （基于你提供的逻辑进行了安全包裹与格式化，去掉了无用的UI冗余标签）
                    "ms_suyi_poxi": {
                        audio: 2,
                        enable: "phaseUse",
                        usable: 1,
                        filterTarget: function (card, player, target) {
                            return target !== player && target.countCards('h') > 0;
                        },
                        content: function () {
                            'step 0'
                            event.list1 = [];
                            event.list2 = [];
                            var chooseButton;
                            if (player.countCards('h') > 0) {
                                chooseButton = player.chooseButton(4, ['你的手牌', player.getCards('h'), get.translation(target.name) + '的手牌', target.getCards('h')]);
                            } else {
                                chooseButton = player.chooseButton(4, [get.translation(target.name) + '的手牌', target.getCards('h')]);
                            }
                            chooseButton.set('target', target);
                            chooseButton.set('ai', function (button) {
                                var player = _status.event.player;
                                var target = _status.event.target;
                                var ps = [];
                                var ts = [];
                                for (var i = 0; i < ui.selected.buttons.length; i++) {
                                    var card = ui.selected.buttons[i].link;
                                    if (target.getCards('h').includes(card)) ts.push(card);
                                    else ps.push(card);
                                }
                                var card = button.link;
                                var owner = get.owner(card);
                                var val = get.value(card) || 1;
                                if (owner == target) {
                                    if (ts.length > 1) return 0;
                                    if (ts.length == 0 || player.hp > 3) return val;
                                    return 2 * val;
                                }
                                return 7 - val;
                            });
                            chooseButton.set('filterButton', function (button) {
                                for (var i = 0; i < ui.selected.buttons.length; i++) {
                                    if (get.suit(button.link) == get.suit(ui.selected.buttons[i].link)) return false;
                                }
                                return true;
                            });

                            'step 1'
                            if (result.bool) {
                                var list = result.links;
                                for (var i = 0; i < list.length; i++) {
                                    if (get.owner(list[i]) == player) {
                                        event.list1.push(list[i]);
                                    } else {
                                        event.list2.push(list[i]);
                                    }
                                }
                                if (event.list1.length && event.list2.length) {
                                    game.loseAsync({
                                        lose_list: [
                                            [player, event.list1],
                                            [target, event.list2]
                                        ],
                                        discarder: player,
                                    }).setContent('discardMultiple');
                                } else if (event.list2.length) {
                                    target.discard(event.list2);
                                } else {
                                    player.discard(event.list1);
                                }
                            } else {
                                event.finish(); // 保护机制：如果没有选满4张牌并点了取消，直接结束技能防止报错
                            }

                            'step 2'
                            if (event.list1.length + event.list2.length == 4) {
                                if (event.list1.length == 0) player.loseMaxHp();
                                if (event.list1.length == 1) {
                                    var evt = _status.event;
                                    for (var i = 0; i < 10; i++) {
                                        if (evt && evt.getParent) evt = evt.getParent();
                                        if (evt.name == 'phaseUse') {
                                            evt.skipped = true; // 强行中断、跳过出牌阶段
                                            game.log(player, '出牌阶段被强行结束！');
                                            break;
                                        }
                                    }
                                }
                                if (event.list1.length == 3) player.recover();
                                if (event.list1.length == 4) player.draw(4);
                            }
                        },
                        ai: {
                            order: 13,
                            result: { target: -1 }
                        }
                    },

                    // ================= 溯忆衍生技：神赵云（龙魂）=================
                    "ms_suyi_longhun": {
                        audio: 2,
                        enable: ["chooseToUse", "chooseToRespond"],
                        prompt: "将♦当火杀，♥当桃，♣当闪，♠当无懈使用或打出（选两张同花色有额外强化）",
                        viewAs: function (cards, player) {
                            if (cards.length) {
                                var name = false, nature = null;
                                switch (get.suit(cards[0], player)) {
                                    case 'club': name = 'shan'; break;
                                    case 'diamond': name = 'sha'; nature = 'fire'; break;
                                    case 'spade': name = 'wuxie'; break;
                                    case 'heart': name = 'tao'; break;
                                }
                                if (name) return { name: name, nature: nature };
                            }
                            return null;
                        },
                        selectCard: [1, 2],
                        complexCard: true,
                        position: "hes",
                        filterCard: function (card, player, event) {
                            if (ui.selected.cards.length) return get.suit(card, player) == get.suit(ui.selected.cards[0], player);
                            event = event || _status.event;
                            var filter = event._backup ? event._backup.filterCard : event.filterCard;
                            if (!filter) return false;
                            var name = get.suit(card, player);
                            if (name == 'club' && filter(get.autoViewAs({ name: 'shan' }, 'unsure'), player, event)) return true;
                            if (name == 'diamond' && filter(get.autoViewAs({ name: 'sha', nature: 'fire' }, 'unsure'), player, event)) return true;
                            if (name == 'spade' && filter(get.autoViewAs({ name: 'wuxie' }, 'unsure'), player, event)) return true;
                            if (name == 'heart' && filter(get.autoViewAs({ name: 'tao' }, 'unsure'), player, event)) return true;
                            return false;
                        },
                        filter: function (event, player) {
                            var filter = event.filterCard;
                            if (filter(get.autoViewAs({ name: 'sha', nature: 'fire' }, 'unsure'), player, event) && player.countCards('hes', { suit: 'diamond' })) return true;
                            if (filter(get.autoViewAs({ name: 'shan' }, 'unsure'), player, event) && player.countCards('hes', { suit: 'club' })) return true;
                            if (filter(get.autoViewAs({ name: 'tao' }, 'unsure'), player, event) && player.countCards('hes', { suit: 'heart' })) return true;
                            if (filter(get.autoViewAs({ name: 'wuxie' }, 'unsure'), player, event) && player.countCards('hes', { suit: 'spade' })) return true;
                            return false;
                        },
                        check: function (card) {
                            if (ui.selected.cards.length) return 0;
                            var player = _status.event.player;
                            if (_status.event.type == 'phase') {
                                var max = 0;
                                var name2;
                                var list = ['sha', 'tao'];
                                var map = { sha: 'diamond', tao: 'heart' };
                                for (var i = 0; i < list.length; i++) {
                                    var name = list[i];
                                    if (player.countCards('hes', function (card) {
                                        return (name != 'sha' || get.value(card) < 5) && get.suit(card, player) == map[name];
                                    }) > 0 && player.getUseValue({ name: name, nature: name == 'sha' ? 'fire' : null }) > 0) {
                                        var temp = get.order({ name: name, nature: name == 'sha' ? 'fire' : null });
                                        if (temp > max) {
                                            max = temp;
                                            name2 = map[name];
                                        }
                                    }
                                }
                                if (name2 == get.suit(card, player)) return (name2 == 'diamond' ? (5 - get.value(card)) : 20 - get.value(card));
                                return 0;
                            }
                            return 1;
                        },
                        ai: {
                            respondSha: true,
                            respondShan: true,
                            skillTagFilter: function (player, tag) {
                                var name;
                                switch (tag) {
                                    case 'respondSha': name = 'diamond'; break;
                                    case 'respondShan': name = 'club'; break;
                                    case 'save': name = 'heart'; break;
                                }
                                if (!player.countCards('hes', { suit: name })) return false;
                            },
                            order: function (item, player) {
                                if (player && _status.event.type == 'phase') {
                                    var max = 0;
                                    var list = ['sha', 'tao'];
                                    var map = { sha: 'diamond', tao: 'heart' };
                                    for (var i = 0; i < list.length; i++) {
                                        var name = list[i];
                                        if (player.countCards('hes', function (card) {
                                            return (name != 'sha' || get.value(card) < 5) && get.suit(card, player) == map[name];
                                        }) > 0 && player.getUseValue({ name: name, nature: name == 'sha' ? 'fire' : null }) > 0) {
                                            var temp = get.order({ name: name, nature: name == 'sha' ? 'fire' : null });
                                            if (temp > max) max = temp;
                                        }
                                    }
                                    max /= 1.1;
                                    return max;
                                }
                                return 2;
                            }
                        },
                        hiddenCard: function (player, name) {
                            if (name == 'wuxie' && _status.connectMode && player.countCards('hs') > 0) return true;
                            if (name == 'wuxie') return player.countCards('hes', { suit: 'spade' }) > 0;
                            if (name == 'tao') return player.countCards('hes', { suit: 'heart' }) > 0;
                        },
                        // 将强化效果拆分为了两个干净的同级技能
                        group: ["ms_suyi_longhun_num", "ms_suyi_longhun_discard"]
                    },
                    "ms_suyi_longhun_num": {
                        trigger: { player: "useCard" },
                        forced: true,
                        popup: false,
                        filter: function (event, player) {
                            // 【修复点】：原代码死绑了 relonghun，现在指向我们专属的 ms_suyi_longhun
                            return ['sha', 'tao'].includes(event.card.name) && event.skill == 'ms_suyi_longhun' && event.cards && event.cards.length == 2;
                        },
                        content: function () {
                            trigger.baseDamage++; // 底层逻辑：杀伤害+1，桃回复量+1
                            game.log(player, '触发双牌龙魂强化，数值+1！');
                        }
                    },
                    "ms_suyi_longhun_discard": {
                        trigger: { player: ["useCardAfter", "respondAfter"] },
                        forced: true,
                        popup: false,
                        logTarget: function () {
                            return _status.currentPhase;
                        },
                        autodelay: function (event) {
                            return event.name == 'respond' ? 0.5 : false;
                        },
                        filter: function (event, player) {
                            // 【修复点】：同理，解绑了死代码
                            return ['shan', 'wuxie'].includes(event.card.name) && event.skill == 'ms_suyi_longhun' &&
                                event.cards && event.cards.length == 2 && _status.currentPhase &&
                                _status.currentPhase != player && _status.currentPhase.countDiscardableCards(player, 'he') > 0;
                        },
                        content: function () {
                            player.line(_status.currentPhase, 'green');
                            player.discardPlayerCard(_status.currentPhase, 'he', true);
                            game.log(player, '触发双牌龙魂强化，拆除当前回合角色一张牌！');
                        }
                    },

                    // ================= 溯忆衍生技：神周瑜（业炎）=================
                    "ms_suyi_yeyan": {
                        unique: true,
                        limited: true,
                        audio: 3,
                        enable: "phaseUse",
                        filterCard: function (card, player) {
                            return !ui.selected.cards.some(function (cardx) { return get.suit(cardx, player) == get.suit(card, player); });
                        },
                        selectCard: [0, 4],
                        filterTarget: function (card, player, target) {
                            var length = ui.selected.cards.length;
                            return length == 0 || length == 4;
                        },
                        selectTarget: function () {
                            if (ui.selected.cards.length == 4) return [1, 2];
                            if (ui.selected.cards.length == 0) return [1, 3];
                            game.uncheck('target');
                            return [1, 3];
                        },
                        complexCard: true,
                        complexSelect: true,
                        line: "fire",
                        forceDie: true,
                        animationColor: "metal",
                        skillAnimation: "legend",
                        check: function (card) {
                            // 修复：替换为 ms_suyi_yeyan
                            if (!lib.skill.ms_suyi_yeyan.getBigFire(get.event('player'))) return -1;
                            return 1 / (get.value(card) || 0.5);
                        },
                        multitarget: true,
                        multiline: true,
                        contentBefore: function () {
                            player.awakenSkill('ms_suyi_yeyan');
                        },
                        content: function () {
                            "step 0"
                            event.num = 0;
                            targets.sortBySeat();
                            "step 1"
                            if (cards.length == 4) event.goto(2);
                            else {
                                if (event.num < targets.length) {
                                    targets[event.num].damage('fire', 1, 'nocard');
                                    event.num++;
                                }
                                if (event.num == targets.length) event.finish();
                                else event.redo();
                            }
                            "step 2"
                            player.loseHp(3);
                            if (targets.length == 1) event.goto(4);
                            else {
                                player.chooseTarget('请选择受到2点伤害的角色', true, function (card, p, target) {
                                    return _status.event.targets.includes(target);
                                }).set('ai', function (target) {
                                    return 1;
                                }).set('forceDie', true).set('targets', targets);
                            }
                            "step 3"
                            if (event.num < targets.length) {
                                var dnum = 1;
                                if (result.bool && result.targets && targets[event.num] == result.targets[0]) dnum = 2;
                                targets[event.num].damage('fire', dnum, 'nocard');
                                event.num++;
                            }
                            if (event.num == targets.length) event.finish();
                            else event.redo();
                            "step 4"
                            player.chooseControl("2点", "3点").set('prompt', '请选择伤害点数').set('ai', function () {
                                return "3点";
                            }).set('forceDie', true);
                            "step 5"
                            targets[0].damage('fire', result.control == "2点" ? 2 : 3, 'nocard');
                        },
                        ai: {
                            order: function (item, player) {
                                return lib.skill.ms_suyi_yeyan.getBigFire(player) ? 10 : 1;
                            },
                            fireAttack: true,
                            result: {
                                target: function (player, target) {
                                    if (player.hasUnknown()) return 0;
                                    var att = get.sgn(get.attitude(player, target));
                                    var targets = game.filterPlayer(function (t) { return get.damageEffect(t, player, player, 'fire') && (!lib.skill.ms_suyi_yeyan.getBigFire(player) || (t.hp <= 3 && !t.hasSkillTag('filterDamage', null, { player: player }))); });
                                    if (!targets.includes(target)) return 0;
                                    if (lib.skill.ms_suyi_yeyan.getBigFire(player)) {
                                        if (ui.selected.targets.length) return 0;
                                        if (!(targets.length == 1 || (att < 0 && target.identity && target.identity.indexOf('zhu') != -1))) return 0;
                                    }
                                    return att * get.damageEffect(target, player, player, 'fire');
                                }
                            }
                        },
                        getBigFire: function (player) {
                            if (player.getDiscardableCards(player, 'h').reduce(function (list, card) { return list.add(get.suit(card, player)); }, []).length < 4) return false;
                            var targets = game.filterPlayer(function (target) { return get.damageEffect(target, player, player, 'fire') && target.hp <= 3 && !target.hasSkillTag('filterDamage', null, { player: player }); });
                            if (!targets.length) return false;
                            if (targets.length == 1 || targets.some(function (target) { return get.attitude(player, target) < 0 && target.identity && target.identity.indexOf('zhu') != -1; })) {
                                var suits = player.getDiscardableCards(player, 'h').reduce(function (map, card) {
                                    var suit = get.suit(card, player);
                                    if (!map[suit]) map[suit] = [];
                                    return map;
                                }, {});
                                var cards = [];
                                Object.keys(suits).forEach(function (i) {
                                    suits[i].addArray(player.getDiscardableCards(player, 'h').filter(function (card) { return get.suit(card) == i; }));
                                    cards.add(suits[i].sort(function (a, b) { return get.value(a) - get.value(b); })[0]);
                                });
                                return player.hp + player.countCards('h', function (card) { return !cards.includes(card) && player.canSaveCard(card, player); }) - 3 > 0;
                            }
                            return false;
                        },
                        mark: true,
                        intro: { content: "limited" },
                        init: function (player, skill) { player.storage[skill] = false; }
                    },

                    // ================= 溯忆衍生技：神吕蒙（攻心）=================
                    "ms_suyi_gongxin": {
                        audio: 2,
                        enable: "phaseUse",
                        usable: 1, // 出牌阶段限一次
                        filterTarget: function (card, player, target) {
                            return target.countCards("h") > 0; // 只要有手牌就能看，不强制排除自己（万一想弃自己的牌呢）
                        },
                        content: function () {
                            "step 0"
                            // 1. 获取目标所有手牌
                            var cards = target.getCards("h");

                            // 2. 动态计算他的手牌里一共有几种颜色
                            // （常规只有 red, black，有些扩展包有 none 无色）
                            var colors = [];
                            for (var i = 0; i < cards.length; i++) {
                                var col = get.color(cards[i], target);
                                if (!colors.includes(col)) colors.push(col);
                            }
                            event.maxSelect = colors.length;

                            // 3. 呼出对话框：选牌数量 [0, 最大颜色数]
                            // 允许选0张，也就是只看看不扔牌
                            player.chooseButton([
                                '攻心：你可以观看其手牌，并弃置其中每种颜色的牌各一张',
                                cards
                            ], [0, event.maxSelect]).set('target', target).set('filterButton', function (button) {
                                // 核心过滤逻辑：保证每种颜色只能点选一张
                                var target = _status.event.target;
                                var color = get.color(button.link, target); // 获取当前这张牌的颜色

                                // 检查已选中的按钮里，有没有颜色相同的
                                for (var i = 0; i < ui.selected.buttons.length; i++) {
                                    if (get.color(ui.selected.buttons[i].link, target) === color) {
                                        return false; // 如果存在同色，这张就置灰不能点
                                    }
                                }
                                return true; // 如果颜色没重复，就能点
                            }).set('ai', function (button) {
                                var player = _status.event.player;
                                var target = _status.event.target;
                                // AI逻辑：对敌人时，弃掉他最珍贵的牌；对队友时，一张都不弃
                                if (get.attitude(player, target) < 0) {
                                    return get.value(button.link, target);
                                }
                                return 0;
                            });

                            "step 1"
                            // 4. 处理选牌结果
                            if (result.bool && result.links && result.links.length > 0) {
                                player.logSkill('ms_suyi_gongxin', target);
                                // 目标弃置被选中的牌
                                target.discard(result.links);
                            } else {
                                // 如果一张都没选
                                game.log(player, '观看了', target, '的手牌，但大发慈悲没有弃置任何牌');
                            }
                        },
                        ai: {
                            threaten: 1.5,
                            order: 10,
                            expose: 0.4,
                            result: {
                                target: function (player, target) {
                                    if (player === target) return 0;
                                    // 给负收益，引导AI主动去找敌人发动
                                    return -target.countCards("h");
                                }
                            }
                        }
                    },
                    // ================= 溯忆衍生技：神曹操（归心）=================
                    "ms_suyi_guixin": {
                        audio: 2,
                        trigger: { player: "damageEnd" },
                        filter: function (event, player) {
                            return event.num > 0;
                        },
                        content: function () {
                            "step 0"
                            // 受到多少点伤害，就循环发动多少次归心
                            event.guixin_count = trigger.num;

                            "step 1"
                            if (event.guixin_count > 0) {
                                event.guixin_count--;
                                // 每次归心都要重新筛选当前有牌的角色
                                event.guixin_targets = game.filterPlayer(function (current) {
                                    return current !== player && current.countCards('hej') > 0;
                                }).sortBySeat();
                            } else {
                                event.finish();
                            }

                            "step 2"
                            if (event.guixin_targets.length > 0) {
                                var current_target = event.guixin_targets.shift();
                                if (current_target.isIn() && current_target.countCards('hej') > 0) {
                                    // 依次拿走每个人区域内的一张牌
                                    player.gainPlayerCard(current_target, 'hej', 1);
                                }
                                event.redo();
                            } else {
                                // 一轮全拿完之后，自身翻面
                                player.turnOver();
                                event.goto(1); // 退回检测是否还有剩余的发动次数
                            }
                        }
                    },

                    // ================= 溯忆衍生技：神司马懿（连破）=================
                    "ms_suyi_lianpo": {
                        audio: 2,
                        trigger: { global: "phaseAfter" },
                        frequent: true,
                        filter: function (event, player) {
                            // 底层特权级数据统计：判断当前回合是否杀过人
                            return player.getStat('kill') > 0;
                        },
                        content: function () {
                            game.log(player, '杀戮之心未止，触发了', '#g【连破】', '获得了额外的回合！');
                            player.insertPhase();
                        }
                    },

                    // ================= ONES男主 =================
                    "ms_aobi": {
                        audio: 2,
                        // 【底层监听】：覆盖所有可能失去牌的时机，与“连营”、“伤逝”的监听级别完全一致
                        trigger: { player: ["loseAfter", "loseAsyncAfter", "cardsDiscardAfter"] },
                        direct: true,
                        filter: function (event, player) {
                            // 核心条件1：当前手牌数必须恰好等于体力值
                            if (player.countCards('h') !== player.hp) return false;

                            // 核心条件2：必须确认刚才失去的牌中包含了“手牌”（防止失去装备也误触发）
                            var evt = event.getl ? event.getl(player) : event;
                            if (!evt || !evt.hs || evt.hs.length === 0) return false;

                            return true;
                        },
                        content: function () {
                            "step 0"
                            player.chooseTarget('骜愎：你可以对至多三名角色各造成1点伤害', [1, 3], function (card, p, target) {
                                return target.isAlive();
                            }).set('ai', function (target) {
                                // AI：只要是敌人，就狠狠地打
                                return get.attitude(_status.event.player, target) < 0 ? 1 : 0;
                            });

                            "step 1"
                            if (result.bool && result.targets && result.targets.length > 0) {
                                player.logSkill('ms_aobi', result.targets);

                                // 【核心记录】：记录本回合内该技能的发动次数
                                if (typeof player.storage.ms_aobi_count !== 'number') {
                                    player.storage.ms_aobi_count = 0;
                                }
                                player.storage.ms_aobi_count++;

                                // 造成伤害
                                // 由于选择了至多三名角色，需要对数组里的每个人依次造成伤害
                                // 使用 sortBySeat 排个序，符合游戏结算的物理时序
                                result.targets.sort(lib.sort.seat);
                                for (var i = 0; i < result.targets.length; i++) {
                                    result.targets[i].damage(1, player);
                                }
                            }
                        },
                        // 挂载用于回合结束时清算次数的隐藏技能
                        group: ["ms_aobi_check"]
                    },
                    "ms_aobi_check": {
                        charlotte: true,
                        // 【清算时机】：任何一个角色的回合结束时
                        trigger: { global: "phaseAfter" },
                        forced: true,
                        silent: true,
                        content: function () {
                            // 读取当前回合 发动骜愎的次数
                            var count = player.storage.ms_aobi_count || 0;

                            // 如果仅仅发动了一次，就彻底剥夺这个技能
                            if (count === 1) {
                                player.removeSkill('ms_aobi');
                                game.log(player, '于本回合内仅发动了1次', '#g【骜愎】', '，永久失去了该技能！');
                            }

                            // 重置计数器，为下一个回合（不论是谁的回合）做准备
                            player.storage.ms_aobi_count = 0;
                        }
                    },

                    // ================= 母Q =================


                    "ms_huaxing": {
                        audio: 2,
                        mark: true,
                        intro: {
                            name: "化形 (行动状态)",
                            content: function (storage, player) {
                                var max = player.storage.ms_huaxing_max || 3;
                                var count = player.storage.ms_huaxing_count || 0;
                                var history = player.storage.ms_huaxing_history || [];
                                var trans = { Zhunbei: '【准备】', Judge: '【判定】', Draw: '【摸牌】', Use: '【出牌】', Discard: '【弃牌】', Jieshu: '【结束】' };
                                var hisStr = [];
                                for (var i = 0; i < history.length; i++) hisStr.push(trans[history[i]]);

                                return "本轮最大追加次数：<b><font color='red'>" + max + "</font></b> 次<br>" +
                                    "本轮已追加次数：<b>" + count + "</b> 次<br>" +
                                    "本轮已执行过的阶段：" + (hisStr.join(' ') || "无");
                            }
                        },
                        group: ["ms_huaxing_init", "ms_huaxing_skip", "ms_huaxing_insert", "ms_huaxing_round"]
                    },

                    // 游戏开始时，初始化化形的红色数字（最大次数）和计数器
                    "ms_huaxing_init": {
                        trigger: { global: "gameStart", player: "enterGame" },
                        forced: true,
                        silent: true,
                        content: function () {
                            player.storage.ms_huaxing_max = 3;
                            player.storage.ms_huaxing_count = 0;
                            player.storage.ms_huaxing_history = [];
                        }
                    },

                    // “你没有回合”：彻底拦截该角色的完整回合机制
                    "ms_huaxing_skip": {
                        trigger: { player: "phaseBefore" },
                        forced: true,
                        content: function () {
                            game.log(player, '触发了', '#g【化形】', '，跳过了其回合');
                            trigger.cancel(); // 物理阻断事件流向下执行子阶段
                        }
                    },

                    // “任意角色的阶段开始前，追加一个任意阶段”
                    "ms_huaxing_insert": {
                        // 覆盖无名杀原生六大子阶段的开启瞬间
                        trigger: { global: ["phaseZhunbeiBegin", "phaseJudgeBegin", "phaseDrawBegin", "phaseUseBegin", "phaseDiscardBegin", "phaseJieshuBegin"] },
                        direct: true,
                        filter: function (event, player) {
                            var max = player.storage.ms_huaxing_max || 3;
                            var count = player.storage.ms_huaxing_count || 0;
                            return count < max; // 只要次数没用完，都能弹窗插队
                        },
                        content: function () {
                            "step 0"
                            var max = player.storage.ms_huaxing_max || 3;
                            var count = player.storage.ms_huaxing_count || 0;

                            // 动态翻译当前是什么阶段开始前
                            var currentPhaseMap = {
                                'phaseZhunbei': '准备阶段', 'phaseJudge': '判定阶段', 'phaseDraw': '摸牌阶段',
                                'phaseUse': '出牌阶段', 'phaseDiscard': '弃牌阶段', 'phaseJieshu': '结束阶段'
                            };
                            var currentPhaseName = currentPhaseMap[trigger.name];

                            var prompt = '化形：当前为 ' + get.translation(trigger.player) + ' 的' + currentPhaseName + '前。你本轮还可追加 ' + (max - count) + ' 次任意阶段。';
                            var choices = ['准备阶段', '判定阶段', '摸牌阶段', '出牌阶段', '弃牌阶段', '结束阶段', 'cancel2'];

                            player.chooseControl(choices).set('prompt', prompt).set('ai', function () {
                                var p = _status.event.player;
                                var history = p.storage.ms_huaxing_history || [];
                                var leftCount = (p.storage.ms_huaxing_max || 3) - (p.storage.ms_huaxing_count || 0);

                                // AI的顶级插队逻辑：
                                // 如果手里有牌能用，优先出牌阶段
                                if (!history.includes('Use') && p.countCards('h') > 0) return '出牌阶段';
                                // 如果手里没牌，急需补充火力，选摸牌阶段
                                if (!history.includes('Draw') && p.countCards('h') < 2) return '摸牌阶段';
                                // 如果手牌太多需要防止掉血，选弃牌阶段
                                if (!history.includes('Discard') && p.countCards('h') > p.hp) return '弃牌阶段';

                                // 尽量避免惩罚，如果在这一轮结束前还有次数，把没执行过的补上
                                if (leftCount > 0) {
                                    if (!history.includes('Use')) return '出牌阶段';
                                    if (!history.includes('Discard') && p.hp <= 2) return '弃牌阶段'; // 血量危险时保血
                                }

                                return 'cancel2'; // 其余情况隐忍，留存次数
                            });

                            "step 1"
                            if (result.control && result.control !== 'cancel2') {
                                var map = {
                                    '准备阶段': 'Zhunbei', '判定阶段': 'Judge', '摸牌阶段': 'Draw',
                                    '出牌阶段': 'Use', '弃牌阶段': 'Discard', '结束阶段': 'Jieshu'
                                };
                                var phaseName = map[result.control];

                                player.logSkill('ms_huaxing');
                                game.log(player, '消耗1次机会，在', trigger.player, '的阶段前，追加了自己的', '#g【' + result.control + '】');

                                // 更新追加次数和历史记录
                                if (typeof player.storage.ms_huaxing_count !== 'number') player.storage.ms_huaxing_count = 0;
                                player.storage.ms_huaxing_count++;

                                if (!player.storage.ms_huaxing_history) player.storage.ms_huaxing_history = [];
                                if (!player.storage.ms_huaxing_history.includes(phaseName)) {
                                    player.storage.ms_huaxing_history.push(phaseName);
                                }

                                player.markSkill('ms_huaxing'); // 刷新UI面板

                                // 【核心机制】：调用无名杀底层原生阶段构建器，将该阶段硬插入到当前事件流的前列！
                                player['phase' + phaseName]();
                            }
                        }
                    },

                    // “每轮结束时的惩罚/红利清算”
                    "ms_huaxing_round": {
                        // 在无名杀中，“每轮结束”最严谨的捕获点就是“下一轮开始时”（避开开局的第1轮）
                        trigger: { global: "roundStart" },
                        forced: true,
                        filter: function (event, player) {
                            return game.roundNumber > 1; // 确保只清算曾经经过的轮次
                        },
                        content: function () {
                            var history = player.storage.ms_huaxing_history || [];

                            // 【结算：摸牌阶段未执行】
                            if (!history.includes('Draw')) {
                                if (typeof player.storage.ms_huaxing_max !== 'number') player.storage.ms_huaxing_max = 3;
                                player.storage.ms_huaxing_max++;
                                game.log(player, '本轮未执行过摸牌阶段，', '#g【化形】', '的红色数字上限+1');
                            }

                            // 【结算：出牌阶段未执行】
                            if (!history.includes('Use')) {
                                game.log(player, '本轮未执行过出牌阶段，触发', '#g【化形】', '摸两张牌');
                                player.draw(2);
                            }

                            // 【结算：弃牌阶段未执行】
                            if (!history.includes('Discard')) {
                                game.log(player, '本轮未执行过弃牌阶段，触发', '#g【化形】', '失去1点体力');
                                player.loseHp(1);
                            }

                            // 轮回结束，彻底重置计数器和历史，迎接下一轮！
                            player.storage.ms_huaxing_count = 0;
                            player.storage.ms_huaxing_history = [];
                            player.markSkill('ms_huaxing');
                        }
                    },

                    // ================= 月宫 =================
                    "ms_duoduo": {
                        audio: 2,
                        trigger: { player: "damageAfter" },
                        // 【AI 注入】：由于是被动询问，加入 check 帮 AI 做决定
                        check: function (event, player) {
                            // 如果上家是敌人，果断同意换座位，打乱其行动与距离
                            // 如果上家是队友，没必要乱动
                            return get.attitude(player, player.previous) <= 0;
                        },
                        filter: function (event, player) {
                            // 确保上家存在且存活
                            return player.previous && player.previous.isAlive();
                        },
                        content: function () {
                            var target = player.previous;
                            game.log(player, '触发了', '#g【踱踱】', '，与上家', target, '交换了位次');

                            // 【高兼容性座位交换】：优先使用官方 API，若老版本不支持则手动硬改底层数组
                            if (typeof game.swapSeat === 'function') {
                                game.swapSeat(player, target);
                            } else {
                                var pos1 = player.dataset.position;
                                var pos2 = target.dataset.position;
                                player.dataset.position = pos2;
                                target.dataset.position = pos1;

                                var idx1 = game.players.indexOf(player);
                                var idx2 = game.players.indexOf(target);
                                game.players[idx1] = target;
                                game.players[idx2] = player;

                                // 重构全局的 next 和 previous 链表
                                game.arrangePlayers();
                            }
                        }
                    },

                    // ================= 2. 迷途 =================
                    "ms_mitu": {
                        audio: 2,
                        enable: "phaseUse",
                        mark: true,
                        // 【AI 注入】：主动技的优先级与发动意愿
                        ai: {
                            order: 9, // 极高优先级，出牌阶段优先摸牌
                            result: {
                                player: 15 // 极高权重（15），保证 AI 必定发动
                            }
                        },
                        intro: {
                            name: "迷途 (摸牌数)",
                            markcount: function (storage, player) {
                                return player.storage.ms_mitu_count || 1;
                            },
                            content: function (storage, player) {
                                var count = player.storage.ms_mitu_count || 1;
                                var status = player.storage.ms_mitu_failed ? "<font color='red'>本回合已失效</font>" : "<font color='green'>可发动</font>";
                                return "每次发动摸 <b><font color='red'>" + count + "</font></b> 张牌<br>状态：" + status;
                            }
                        },
                        filter: function (event, player) {
                            return !player.storage.ms_mitu_failed;
                        },
                        content: function () {
                            "step 0"
                            if (typeof player.storage.ms_mitu_count !== 'number') {
                                player.storage.ms_mitu_count = 1;
                            }
                            var count = player.storage.ms_mitu_count;

                            var cards = get.cards(count);
                            event.mitu_cards = cards;
                            player.gain(cards, 'draw');

                            "step 1"
                            var valid_cards = [];
                            var hcards = player.getCards('h');
                            for (var i = 0; i < event.mitu_cards.length; i++) {
                                if (hcards.indexOf(event.mitu_cards[i]) !== -1) {
                                    valid_cards.push(event.mitu_cards[i]);
                                }
                            }
                            event.mitu_cards = valid_cards;

                            if (event.mitu_cards.length > 0) {
                                player.chooseTarget('迷途：请选择一名其他角色进行拼点', function (card, p, target) {
                                    return target !== p && target.countCards('h') > 0; // 只要对方有手牌就能拼
                                }).set('ai', function (target) {
                                    // 【AI 注入】：大尺度选人逻辑（5~15）
                                    var player = _status.event.player;
                                    var att = get.attitude(player, target);

                                    // 绝对不主动找队友拼点，避免消耗队友手牌
                                    if (att >= 0) return 0;

                                    // 基础仇恨值转换（敌对态度越深，分数越高）
                                    var score = 10 - att;

                                    // 绝杀加分：如果敌人手牌极少（1~2张），强行拉他拼点能直接破坏其防御核心，极具战略意义
                                    if (target.countCards('h') <= 2) score += 5;

                                    // 将最终得分严格限制在 5 ~ 15 的高权重区间内
                                    return Math.min(15, Math.max(5, score));
                                });
                            } else {
                                game.log(player, '刚摸到的牌已不在手中，无法拼点！');
                                // 【修复1】：摸牌后因为特殊原因牌没了，也算作提前终止，直接失效
                                player.storage.ms_mitu_failed = true;
                                player.markSkill('ms_mitu');
                                event.finish();
                            }

                            "step 2"
                            if (result.bool && result.targets && result.targets.length > 0) {
                                event.target = result.targets[0];

                                // 【自制拼点第一阶段】：自己强制从指定的牌里选一张
                                player.chooseCard('h', 1, '请选择用来与 ' + get.translation(event.target) + ' 拼点的牌（只能选刚摸的牌）', true).set('filterCard', function (card, player) {
                                    return _status.event.mitu_cards.indexOf(card) !== -1;
                                }).set('mitu_cards', event.mitu_cards).set('ai', function (card) {
                                    // 【AI 注入】：为了让技能成长数 +1，必须竭尽全力赢！点数越大，出牌意愿越强
                                    return get.number(card) * 5;
                                });
                            } else {
                                // 【修复2】：在选目标时点了取消，直接判负并失效
                                player.storage.ms_mitu_failed = true;
                                player.markSkill('ms_mitu');
                                game.log(player, '取消了拼点，', '#g【迷途】', '本回合失效');
                                event.finish();
                            }

                            "step 3"
                            if (result.bool && result.cards && result.cards.length > 0) {
                                event.player_card = result.cards[0];
                                // 选中后，先把牌移出到桌面上，播放出牌动画
                                player.lose(event.player_card, ui.special, 'to_insert');
                                player.$give(event.player_card, player, false);

                                // 【自制拼点第二阶段】：轮到对方选一张手牌来拼点
                                event.target.chooseCard('h', 1, '请选择一张牌与 ' + get.translation(player) + ' 拼点', true).set('ai', function (card) {
                                    // 【AI 注入】：被拼点者的深度博弈逻辑
                                    var target = _status.event.player; // 当前正在选牌的人（即 event.target）
                                    // 此时 player 变量来自于外层闭包，代表发动【迷途】的人

                                    if (get.attitude(target, player) > 0) {
                                        // 场景A：如果是队友（比如全场没敌人了迫不得已选了队友）
                                        // 队友会倾尽全力出【最小】的牌，甚至故意出 A，保送你赢，让你成长！
                                        return 20 - get.number(card);
                                    } else {
                                        // 场景B：如果是敌人
                                        // 敌人知道你要成长，绝对不能让你得逞！全力出【最大】的牌进行阻击！
                                        return get.number(card) * 5;
                                    }
                                });
                            } else {
                                // 【修复3】：在自己选拼点牌时点了取消，直接判负并失效
                                player.storage.ms_mitu_failed = true;
                                player.markSkill('ms_mitu');
                                game.log(player, '取消了出牌，', '#g【迷途】', '本回合失效');
                                event.finish();
                            }

                            "step 4"
                            if (result.bool && result.cards && result.cards.length > 0) {
                                event.target_card = result.cards[0];
                                event.target.lose(event.target_card, ui.special, 'to_insert');
                                event.target.$give(event.target_card, event.target, false);

                                // 模拟拼点展示
                                game.log(player, '与', event.target, '进行拼点');
                                game.log(player, '的拼点牌为', event.player_card);
                                game.log(event.target, '的拼点牌为', event.target_card);

                                // 比较点数
                                var num1 = get.number(event.player_card);
                                var num2 = get.number(event.target_card);

                                event.playerWin = (num1 > num2);

                                // 拼完后，牌进入弃牌堆
                                player.discard(event.player_card);
                                event.target.discard(event.target_card);

                                game.delay(1); // 留出视觉停顿时间
                            } else {
                                // 【修复4】：极小概率目标未成功出牌，同样算作你没赢，直接失效
                                player.storage.ms_mitu_failed = true;
                                player.markSkill('ms_mitu');
                                event.finish();
                            }

                            "step 5"
                            if (event.playerWin === true) {
                                player.storage.ms_mitu_count++;
                                player.markSkill('ms_mitu');
                                game.log(player, '拼点赢了，', '#g【迷途】', '的摸牌数永久+1，当前为', '#r' + player.storage.ms_mitu_count);
                            } else {
                                player.storage.ms_mitu_failed = true;
                                player.markSkill('ms_mitu');
                                game.log(player, '拼点未赢，', '#g【迷途】', '本回合失效');
                            }
                        },
                        group: "ms_mitu_reset"
                    },
                    "ms_mitu_reset": {
                        charlotte: true,
                        trigger: { global: "phaseAfter" },
                        forced: true,
                        silent: true,
                        filter: function (event, player) {
                            return player.storage.ms_mitu_failed;
                        },
                        content: function () {
                            player.storage.ms_mitu_failed = false;
                            player.markSkill('ms_mitu');
                        }
                    },
                    // ================= 枣介 =================

                    // ================= 胆识 =================
                    "danshi": {
                        audio: 2,
                        enable: ["chooseToUse", "chooseToRespond"],
                        // 欺骗底层 AI，让它知道缺牌时可以用这个技能
                        hiddenCard: function (player, name) {
                            if (player.storage.danshi_disabled) return false;
                            var type = get.type(name);
                            if (type !== "basic" && type !== "trick") return false;
                            return !player.getStorage("danshi").includes(name) && player.countCards("he") > 0 && lib.inpile.includes(name);
                        },
                        // 发动条件检测
                        filter: function (event, player) {
                            if (player.storage.danshi_disabled) return false; // 本回合是否已失效
                            if (player.countCards("he") === 0) return false;

                            for (var name of lib.inpile) {
                                if (player.getStorage("danshi").includes(name)) continue;
                                var type = get.type(name);
                                if (type !== "basic" && type !== "trick") continue;

                                try {
                                    if (event.filterCard(new lib.element.VCard({ name: name }), player, event)) return true;
                                    if (name === 'sha') {
                                        for (var nature of lib.inpile_nature) {
                                            if (event.filterCard(new lib.element.VCard({ name: name, nature: nature }), player, event)) return true;
                                        }
                                    }
                                } catch (e) { }
                            }
                            return false;
                        },
                        // 选单面板
                        chooseButton: {
                            dialog: function (event, player) {
                                var list = [];
                                for (var name of lib.inpile) {
                                    if (player.getStorage("danshi").includes(name)) continue;
                                    var type = get.type(name);
                                    if (type === "basic" || type === "trick") {
                                        try {
                                            if (event.filterCard(new lib.element.VCard({ name: name }), player, event)) {
                                                list.push([get.translation(type), "", name]);
                                            } else if (name === 'sha') {
                                                for (var j of lib.inpile_nature) {
                                                    if (event.filterCard(new lib.element.VCard({ name: name, nature: j }), player, event)) {
                                                        list.push(["基本", "", "sha", j]);
                                                    }
                                                }
                                            }
                                        } catch (e) { }
                                    }
                                }
                                return ui.create.dialog("胆识：请选择要视为的卡牌", [list, "vcard"], 'hidden');
                            },
                            filter: function (button, player) { return true; },
                            check: function (button) { return 1; },
                            // 选定牌名后，进入这个真实的选牌视为环节
                            backup: function (links, player) {
                                return {
                                    filterCard: function (card, player) {
                                        return true; // 任意一张牌皆可
                                    },
                                    selectCard: 1, // 选1张牌作为代价
                                    position: "he",
                                    popname: true,
                                    viewAs: { name: links[0][2], nature: links[0][3], isCard: true, skill: 'danshi' },
                                    // 在出牌的瞬间，将该牌名记入黑名单
                                    onuse: function (result, player) {
                                        player.markAuto("danshi", [result.card.name]);
                                    }
                                };
                            },
                            prompt: function (links, player) {
                                return "将一张牌当做【" + (get.translation(links[0][3]) || "") + get.translation(links[0][2]) + "】使用或打出";
                            }
                        },
                        mark: true,
                        intro: {
                            content: "已当做以下牌使用过：$"
                        },
                        ai: {
                            save: true,
                            respondSha: true,
                            respondShan: true,
                            skillTagFilter: function (player, tag, arg) {
                                if (player.storage.danshi_disabled) return false;
                                if (player.countCards("he") === 0) return false;
                                if (tag === "respondSha") return !player.getStorage("danshi").includes("sha");
                                if (tag === "respondShan") return !player.getStorage("danshi").includes("shan");
                                if (tag === "save") return !player.getStorage("danshi").includes("tao");
                                return false;
                            },
                            order: 4
                        },
                        group: ["danshi_after", "danshi_clear"]
                    },

                    // ================= 胆识的后续结算（火攻） =================
                    "danshi_after": {
                        // 在出牌或打出完全结算完毕后触发
                        trigger: { player: ["useCardAfter", "respondAfter"] },
                        forced: true,
                        silent: true,
                        filter: function (event, player) {
                            return event.card && event.card.skill === 'danshi';
                        },
                        content: function () {
                            "step 0"
                            var target = _status.currentPhase;
                            if (!target || !target.isAlive()) {
                                game.log('当前没有回合角色，', '#g【胆识】', '后续效果失效');
                                event.finish();
                                return;
                            }

                            // 给自己挂载一个追踪火攻伤害的探针
                            player.storage.danshi_hit = false;
                            player.addTempSkill('danshi_tracker');

                            // 视为对当前回合角色使用一张火攻
                            player.logSkill('danshi', target);
                            var huogong = new lib.element.VCard({ name: 'huogong', isCard: true });
                            player.useCard(huogong, target);

                            "step 1"
                            player.removeSkill('danshi_tracker');

                            // 根据火攻是否命中，执行后续
                            if (player.storage.danshi_hit) {
                                game.log(player, '通过', '#y【火攻】', '造成了伤害，', '#g【胆识】', '触发摸牌');
                                player.draw(2);
                            } else {
                                game.log(player, '未能通过', '#y【火攻】', '造成伤害，', '#g【胆识】', '本回合失效');
                                player.storage.danshi_disabled = true; // 挂上本回合失效的 Flag
                            }
                        }
                    },

                    // ================= 火攻探针 =================
                    "danshi_tracker": {
                        trigger: { source: "damage" },
                        forced: true,
                        silent: true,
                        popup: false,
                        filter: function (event, player) {
                            return event.card && event.card.name === 'huogong';
                        },
                        content: function () {
                            player.storage.danshi_hit = true; // 记录命中
                        }
                    },

                    // ================= 回合结束清除失效标记 =================
                    "danshi_clear": {
                        trigger: { global: "phaseAfter" },
                        forced: true,
                        silent: true,
                        filter: function (event, player) {
                            return player.storage.danshi_disabled;
                        },
                        content: function () {
                            player.storage.danshi_disabled = false; // 清除失效状态
                        }
                    },
                    // ================= 游离子=================
                    // ================= 1. 捉瓮 =================
                    "ms_zhuoweng": {
                        audio: 2,
                        trigger: { global: "phaseBeforeStart" },
                        filter: function (event, player) {
                            return player.countCards('h') > 0;
                        },
                        content: function () {
                            "step 0"
                            player.chooseCard('h', 1, '捉瓮：你可以选择一张手牌标记并秘密置于牌堆顶前五张任意位置').set('ai', function (card) {
                                return 7 - get.value(card);
                            });

                            "step 1"
                            if (result.bool && result.cards && result.cards.length > 0) {
                                event.trap_card = result.cards[0];

                                var pileCount = ui.cardPile.childNodes.length;
                                var maxDepth = Math.min(5, pileCount + 1);
                                var choices = [];
                                for (var i = 1; i <= maxDepth; i++) {
                                    choices.push('第' + i + '张');
                                }

                                player.chooseControl(choices).set('prompt', '请选择将该牌置于牌堆顶的哪个位置').set('ai', function () {
                                    var opts = _status.event.controls;
                                    return opts[Math.floor(Math.random() * opts.length)];
                                });
                            } else {
                                event.finish();
                            }

                            "step 2"
                            if (result.control) {
                                player.logSkill('ms_zhuoweng');
                                var str = result.control;
                                var num = parseInt(str.replace(/[^0-9]/ig, ''));
                                var idx = num - 1;

                                var card = event.trap_card;
                                player.lose(card, ui.special, 'to_insert');

                                // 标记卡牌所有者，并开启全场“摸牌嗅探器”
                                card.ms_zhuoweng_owner = player;
                                player.addSkill('ms_zhuoweng_sniffer');

                                if (idx < ui.cardPile.childNodes.length) {
                                    ui.cardPile.insertBefore(card, ui.cardPile.childNodes[idx]);
                                } else {
                                    ui.cardPile.appendChild(card);
                                }

                                game.log(player, '将一张牌秘密置入了牌堆中');
                            }
                        }
                    },

                    // 嗅探器：专门盯谁摸到了这颗雷
                    "ms_zhuoweng_sniffer": {
                        charlotte: true,
                        // 【全方位获取监听】：无论是 draw、gain、还是从判定区拿牌，只要牌进手里了，就挂炸弹
                        trigger: { global: ["gainAfter", "equipAfter", "judgeAfter"] },
                        forced: true,
                        silent: true,
                        filter: function (event, player) {
                            if (event.player === player) return false;
                            var cards = event.cards || [event.card];
                            if (!cards || !cards.length) return false;

                            for (var i = 0; i < cards.length; i++) {
                                if (cards[i] && cards[i].ms_zhuoweng_owner === player) return true;
                            }
                            return false;
                        },
                        content: function () {
                            var cards = trigger.cards || [trigger.card];
                            for (var i = 0; i < cards.length; i++) {
                                if (cards[i] && cards[i].ms_zhuoweng_owner === player) {
                                    trigger.player.addSkill('ms_zhuoweng_bomb');
                                    trigger.player.storage.ms_zhuoweng_source = player;
                                    break;
                                }
                            }
                        }
                    },

                    // 体内炸弹：无视物理坐标的终极引爆判定
                    "ms_zhuoweng_bomb": {
                        charlotte: true,
                        // 【绝对引爆监听】：useCard(主动使用)、respond(打出响应)、discard(弃置)、lose(被顺手牵羊/过河拆桥)
                        trigger: { player: ["useCardAfter", "respondAfter", "discardAfter", "loseAfter"] },
                        forced: true,
                        silent: true,
                        filter: function (event, player) {
                            var source = player.storage.ms_zhuoweng_source;
                            if (!source || !source.isIn()) return false;

                            // 获取本次事件牵扯到的所有牌
                            var cards = event.cards2 || event.cards || [event.card];
                            if (!cards || !cards.length) return false;

                            // 只要这些牌里有带着主人的标记的，无条件引爆！
                            // （不再去判断那可恶的 position 和 parentNode，只要从手里出去了就算明置失去）
                            for (var i = 0; i < cards.length; i++) {
                                var c = cards[i];
                                if (c && c.ms_zhuoweng_owner === source) {
                                    return true;
                                }
                            }
                            return false;
                        },
                        content: function () {
                            "step 0"
                            var source = player.storage.ms_zhuoweng_source;
                            var cards = trigger.cards2 || trigger.cards || [trigger.card];
                            event.trap_card = null;

                            for (var i = 0; i < cards.length; i++) {
                                var c = cards[i];
                                if (c && c.ms_zhuoweng_owner === source) {
                                    event.trap_card = c;
                                    break;
                                }
                            }

                            if (event.trap_card && source) {
                                // 1. 清理标记，卸载体内炸弹，防止二次爆炸
                                delete event.trap_card.ms_zhuoweng_owner;
                                player.removeSkill('ms_zhuoweng_bomb');
                                delete player.storage.ms_zhuoweng_source;

                                source.logSkill('ms_zhuoweng', player);
                                game.log(player, '打出或失去了被', source, '标记的雷', event.trap_card, '，触发了', '#g【捉瓮】');

                                event.source = source;

                                // 2. 抢他一张牌
                                if (player.countCards('he') > 0) {
                                    source.gainPlayerCard(player, 'he', 1);
                                }
                            } else {
                                event.finish();
                            }

                            "step 1"
                            // 3. 砍他一刀
                            if (player && player.isAlive() && event.source) {
                                player.damage(1, event.source);
                            }
                        }
                    },
                    // ================= 2. 雏愿 =================
                    "ms_chuyuan": {
                        audio: 2,
                        // 覆盖“你对别人用杀”以及“别人对你用伤害牌”两个时机
                        trigger: { player: "useCardToPlayered", target: "useCardToTargeted" },
                        filter: function (event, player) {
                            if (event.name === 'useCardToPlayered') {
                                // 你对别人用杀
                                return event.card.name === 'sha' && event.target.countCards('h') > 0;
                            } else {
                                // 别人对你用伤害牌
                                return get.tag(event.card, 'damage') && event.player.countCards('h') > 0;
                            }
                        },
                        content: function () {
                            "step 0"
                            // 确定要猜的目标角色
                            event.oppo = (trigger.name === 'useCardToPlayered') ? trigger.target : trigger.player;

                            // 读取目标真实的底牌构成
                            event.hasBasic = event.oppo.hasCard(function (c) { return get.type(c) === 'basic'; }, 'h');
                            event.hasTrick = event.oppo.hasCard(function (c) { return get.type(c) === 'trick' || get.type(c) === 'delay'; }, 'h');
                            event.hasEquip = event.oppo.hasCard(function (c) { return get.type(c) === 'equip'; }, 'h');

                            event.guesses = {}; // 用来存储你的三个回答

                            // 连问第一弹：基本牌
                            player.chooseControl('有', '没有').set('prompt', '雏愿：你猜测 ' + get.translation(event.oppo) + ' 的手牌中是否包含【基本牌】？').set('ai', function () {
                                // AI开启全视之眼作弊（纯娱乐逻辑，人类看不见）
                                return _status.event.realAns ? '有' : '没有';
                            }).set('realAns', event.hasBasic);

                            "step 1"
                            event.guesses.basic = (result.control === '有');

                            // 连问第二弹：锦囊牌
                            player.chooseControl('有', '没有').set('prompt', '雏愿：你猜测 ' + get.translation(event.oppo) + ' 的手牌中是否包含【锦囊牌】？').set('ai', function () {
                                return _status.event.realAns ? '有' : '没有';
                            }).set('realAns', event.hasTrick);

                            "step 2"
                            event.guesses.trick = (result.control === '有');

                            // 连问第三弹：装备牌
                            player.chooseControl('有', '没有').set('prompt', '雏愿：你猜测 ' + get.translation(event.oppo) + ' 的手牌中是否包含【装备牌】？').set('ai', function () {
                                return _status.event.realAns ? '有' : '没有';
                            }).set('realAns', event.hasEquip);

                            "step 3"
                            event.guesses.equip = (result.control === '有');

                            game.log(player, '猜测对方手牌结构为：',
                                '基本牌-', event.guesses.basic ? '有' : '无', '，',
                                '锦囊牌-', event.guesses.trick ? '有' : '无', '，',
                                '装备牌-', event.guesses.equip ? '有' : '无'
                            );

                            // 进行核对
                            if (event.guesses.basic === event.hasBasic &&
                                event.guesses.trick === event.hasTrick &&
                                event.guesses.equip === event.hasEquip) {

                                player.logSkill('ms_chuyuan', event.oppo);
                                game.log(player, '全部猜中！触发了', '#g【雏愿】', '奖励！');

                                if (event.oppo.countCards('he') > 0) {
                                    // 获取对方至多两张牌
                                    player.gainPlayerCard(event.oppo, 'he', [1, 2]);
                                }
                            } else {
                                game.log(player, '猜测失败，', '#g【雏愿】', '无事发生');
                            }
                        }
                    },
                },
                translate: {

                    // --- 技能翻译 ---
                    "ms_feisheng": "飞升",
                    "ms_feisheng_info": "<b>限定技</b>，出牌阶段，你可以视为使用一张普通锦囊牌，此牌结算后，佐藤雏令一名角色与你拼点：1.若其赢，你获得其点数不大于其拼点牌的所有牌；2.若其未赢，令其获得【成疾】。",
                    "ms_chengji": "成疾",
                    "ms_chengji_info": "<b>限定技，锁定技</b>，若你能使用【闪】，则你视为使用之，此牌结算后，佐藤雏令一名角色与你拼点：1.若你赢，其获得你点数不大于你拼点牌的所有牌；2.若你未赢，令其获得【飞升】。",
                    "ms_chengji_after": "成疾后续",

                    "ms_sushen": "塑身",
                    "ms_sushen_info": "每轮开始时，你可以令一名角色提前执行出牌阶段。此阶段结束时，你可以对其造成X点伤害（X为4减去此阶段进入弃牌堆的花色数）。",

                    "ms_qiangyu": "强欲",
                    "ms_qiangyu_info": "一名角色每轮首次于回合外使用一种类型的牌后，你可以观看其手牌。若其中有同类型的牌，你可以选择其中一张，令此牌本回合视为附带<span style=\"color: purple;\"><b>毒</b></span>效果的【无中生有】、【逐近弃远】或【决斗】。",

                    // --- 主技能翻译 ---
                    "ms_tianyi": "天意",
                    "ms_tianyi_info": "你造成或受到伤害后，可以选择一项：<br>1. 获得对方判定区内一张牌；<br>2. 令一名角色进行一次【闪电】判定。",

                    "ms_didong": "地动",
                    "ms_didong_info": "你可以交换游戏中两个非装备区区域的牌，视为你使用一张基本牌；<br>若交换的牌差小于等于上次交换的牌差，你失去此技能，否则你对区域内牌数变多的角色造成1点伤害。",

                    "ms_shuguang": "赎光",
                    "ms_shuguang_info": "<b>限定技</b>，出牌阶段，你可以选择一名其他角色，你们互相可以对对方发动【鬼才】。<br>当该目标阵亡后，恢复此限定技。",
                    "ms_shuguang_rejudge": "赎光改判",
                    "ms_shuguang_restore": "赎光恢复",

                    "ms_yifu": "遗腹",
                    "ms_yifu_info": "<b>锁定技</b>，当你受到属性伤害/非属性伤害后，你下次受到非属性伤害/属性伤害时摸三张牌。（可以叠加，例如连续受两次属性伤害，下次受非属性伤害时摸六张）",
                    "ms_jinjin": "金烬",
                    "ms_jinjin_info": "<b>转换技</b>，出牌阶段：<br>【阳】：你可以视为对一名其他角色使用一张【火攻】；<br>【阴】：你可以令一名其他角色视为对你使用一张【火攻】。<br>此牌结算后，若未造成伤害，被使用者对使用者造成1点伤害。",

                    // --- 隐藏衍生/状态技能翻译 ---
                    "ms_jinjin_tracker": "金烬结算追踪",
                    "ms_jinjin_damage_tracker": "金烬伤害追踪",

                    "ms_duodi": "夺嫡",
                    "ms_duodi_info": "出牌阶段限一次，你可以将两张手牌分别交给两名其他角色，然后这两名角色依次选择一项：1.对对方使用一张【杀】；2.受到你造成的1点伤害。",
                    "ms_ningzhong": "凝众",
                    "ms_ningzhong_info": "<b>锁定技</b>，首轮开始时，你选择两名不同的角色，分别获得【破军】和【界铁骑】。拥有因此获得的技能的角色死亡后，你将其获得的此技能交给一名存活角色。",

                    // --- 衍生/附属技能翻译 ---
                    "ms_tieji": "铁骑",
                    "ms_tieji_info": "当你使用【杀】指定一名角色为目标后，你可以进行一次判定并令该角色的非锁定技失效直到回合结束，然后除非该角色弃置一张与判定结果花色相同的牌，否则不能使用【闪】响应此【杀】。",
                    "ms_pojun": "破军",
                    "ms_pojun_info": "当你于出牌阶段内使用【杀】指定一个目标后，你可以将其至多X张牌置于其武将牌上（X为其体力值）；若如此做，当前回合结束后，该角色获得这些牌。",
                    "ms_pojun_back": "破军归位",
                    "ms_ningzhong_shift": "凝众转移",

                    "ms_qiuzhi": "求知",
                    "ms_qiuzhi_info": "即时牌指定与你距离1以内的目标后，你可以弃置一张手牌，若假设你正常使用此手牌的所有合法目标，与该牌的实际目标：<br>有重合：你弃置这些重合角色各一张牌；<br>完全重合：改为你获得这些角色各一张牌；<br>互补为所有角色：你摸两张牌，并对实际目标各造成一点伤害。",

                    "ms_ruxian": "入险",
                    "ms_ruxian_info": "即时牌指定与你距离1以内的目标后，你可以选择一项：1. 横置，为此牌追加至多两个目标；2. 对自己造成1点火属性伤害，为此牌取消至多两个目标。",

                    "ms_huaiyuan": "怀愿",
                    "ms_huaiyuan_info": "<b>锁定技</b>，回合开始时，你将体力值与手牌数调整至等于牌堆里剩余雷【杀】数；<br>其它角色失去雷【杀】时，你对其造成两点雷属性伤害；<br>出牌阶段，每名角色限一次，你可以交给一名角色一张雷【杀】，然后获得其两张牌。",
                    "ms_huaiyuan_lose": "怀愿（天雷）",
                    "ms_huaiyuan_use": "怀愿（夺牌）",
                    "ms_huaiyuan_used": "怀愿已发动",

                    "ms_yuhua": "羽化",
                    "ms_yuhua_info": "<b>觉醒技，</b>你的回合开始时，或受到伤害后，你可以展示牌堆顶存活角色数张牌，然后依次分配给每名角色各一张牌；准备阶段开始时，若你以此法分配牌数大于等于存活角色数的三倍，你减1点体力上限，获得技能【溯忆】。",

                    "ms_yuhua": "羽化",
                    "ms_yuhua_info": "<b>觉醒技，</b>你的回合开始时，造成或受到伤害后，你可以展示牌堆顶存活角色数张牌，然后依次分配给每名角色各一张牌；准备阶段开始时，若你以此法分配牌数<b>大于等于</b>存活角色数的<b>三倍</b>，你减1点体力上限，获得技能【溯忆】。",

                    // 下面是补充的子技能翻译，专门用来解决弹窗显示英文 ID 的问题
                    "ms_yuhua_distribute": "羽化",
                    "ms_yuhua_distribute_info": "你的回合开始时，或受到伤害后，你可以展示牌堆顶存活角色数张牌，然后依次分配给每名角色各一张牌。",

                    "ms_yuhua_awaken": "羽化",
                    "ms_yuhua_awaken_info": "准备阶段开始时，若你以此法分配牌数大于等于存活角色数的三倍，你减1点体力上限，获得技能【溯忆】。",


                    "ms_suyi": "溯忆",
                    "ms_suyi_info": "出牌阶段开始时，你从四个随机神将祝福中选择两个获得（全图共12个效果或技能，抽取不重复，三回合后不再分发）。",

                    "ms_suyi_wushen": "武神",
                    "ms_suyi_wushen_info": "出牌阶段，每名角色限一次，你可以弃置任意张红色牌，对一名角色造成等量的伤害。",


                    "ms_suyi_cuike": "摧克",
                    "ms_suyi_cuike_1": "摧克",
                    "ms_suyi_cuike_info": "出牌阶段各限一次：①你可以弃置两名角色各一张牌，然后横置这两名角色；②你可以对一名角色造成1点火焰伤害，并弃置其装备区内所有牌。",
                    "ms_suyi_cuike_1_info": "出牌阶段各限一次：①你可以弃置两名角色各一张牌，然后横置这两名角色；②你可以对一名角色造成1点火焰伤害，并弃置其装备区内所有牌。",
                    "ms_suyi_cuike_2": "摧克",
                    "ms_suyi_cuike_2_info": "出牌阶段各限一次：①你可以弃置两名角色各一张牌，然后横置这两名角色；②你可以对一名角色造成1点火焰伤害，并弃置其装备区内所有牌。",

                    "ms_suyi_duorui": "夺锐",
                    "ms_suyi_duorui_info": "你的回合内，所有其他角色的非锁定技失效。",

                    "ms_suyi_poxi": "魄袭",
                    "ms_suyi_poxi_info": "出牌阶段限一次，你可以观看一名其他角色的手牌，然后你展示你与其共计四张手牌，若花色均不相同，弃置之。然后根据其中你展示的牌数执行以下效果：0张：减1点体力上限；1张：结束出牌阶段；3张：回复1点体力；4张：摸四张牌。",

                    "ms_suyi_longhun": "龙魂",
                    "ms_suyi_longhun_info": "你可以将同花色的牌按以下规则使用或打出：红桃当【桃】；方块当火【杀】；梅花当【闪】；黑桃当【无懈可击】。若你以此法使用了两张牌，则若转化牌为【杀】或【桃】，此牌伤害或回复量+1；若为【闪】或【无懈可击】，你可以弃置当前回合角色一张牌。",

                    "ms_suyi_yeyan": "业炎",
                    "ms_suyi_yeyan_info": "<b>限定技，</b>出牌阶段，你可以选择1至3名角色，你分别对他们造成最多共3点火焰伤害（若你将对一名角色分配2点或以上火焰伤害，你须先弃置四张不同花色的手牌并失去3点体力）。",

                    "ms_suyi_gongxin": "攻心",
                    "ms_suyi_gongxin_info": "出牌阶段限一次，你可以观看一名角色的手牌，并弃置其中每种颜色的牌各一张。",

                    "ms_suyi_guixin": "归心",
                    "ms_suyi_guixin_info": "当你受到1点伤害后，你可以获得每名其他角色区域内的一张牌，然后你翻面。",

                    "ms_suyi_lianpo": "连破",
                    "ms_suyi_lianpo_info": "当一名角色的回合结束后，若你于此回合内杀死过至少一名角色，你可以获得一个额外的回合。",

                    "ms_aobi": "骜愎",
                    "ms_aobi_info": "当你失去手牌后，若你的手牌数与体力值相等，你可以对至多三名角色各造成1点伤害；<br>每个回合结束时，若你发动且仅发动了一次本技能，则你失去本技能。",

                    // --- 隐藏衍生/状态技能翻译 ---
                    "ms_aobi_check": "骜愎清算",

                    "ms_huaxing": "化形",
                    "ms_huaxing_info": "<b>锁定技</b>，你没有回合；每轮限<font color='red'>三</font>次，任意角色的阶段开始前，你可以追加一个你的任意阶段；<br>每轮结束时，若你本轮未执行过：<br>摸牌阶段，你令红色数字+1；<br>出牌阶段，你摸两张牌；<br>弃牌阶段，你失去1点体力。",

                    // --- 隐藏衍生/状态技能翻译 ---
                    "ms_huaxing_init": "化形初始化",
                    "ms_huaxing_skip": "化形跳过回合",
                    "ms_huaxing_insert": "化形插队",
                    "ms_huaxing_round": "化形轮次清算",

                    "ms_duoduo": "踱踱",
                    "ms_duoduo_info": "当你受到伤害后，你可以与上家交换位次。",
                    "ms_mitu": "迷途",
                    "ms_mitu_info": "出牌阶段，你可以摸 <font color='red'><b>1</b></font> 张牌并用其中一张牌与一名其他角色拼点：<br>若你拼赢，你令上方红色数字永久+1；<br>若你没有拼赢，此技能本回合失效。",

                    // --- 隐藏衍生/状态技能翻译 ---
                    "ms_mitu_reset": "迷途重置",

                    "danshi": "胆识",
                    "danshi_info": "每种牌名限一次，当你需要使用或打出基本牌或普通锦囊牌时，你可以将一张牌当任意一张该类型的牌使用或打出。此牌结算后，你视为对当前回合角色使用一张【火攻】：若击中（造成伤害），你摸两张牌；若未击中，此技能本回合失效。",
                    "danshi_after": "胆识",
                    "danshi_tracker": "胆识火攻探针",
                    "danshi_clear": "胆识清理",

                    "ms_zhuoweng": "捉瓮",
                    "ms_zhuoweng_info": "每回合开始时，你可以标记一张手牌，并秘密将其置于牌堆顶前五张内的任意位置；此后当此牌<font color='green'><b>首次</b></font>被<font color='green'><b>其他</b></font>角色<font color='green'><b>正面朝上</b></font>失去时，你获得其一张牌并对其造成1点伤害。",
                    "ms_chuyuan": "雏愿",
                    "ms_chuyuan_info": "当你对其他角色使用【杀】，或其他角色对你使用伤害类牌时，你可以猜测对方手牌中是否包含【基本牌】、【锦囊牌】和【装备牌】；若你全部猜对，你获得对方两张牌。",

                    // --- 隐藏衍生/状态技能翻译 ---
                    "ms_zhuoweng_tracker": "捉瓮追踪",
                }
            }
        },

        // ================= 【资源预加载层】 =================
        files: {
            character: [
                "ms_satohina",
                "ms_shenhuxiaoniao",
                "ms_gouri",
                "ms_furukawanagisa",
                "ms_sakagamitomoyo",
                "ms_kute",
                "ms_lihuazou",
                "ms_guanling",
                "ms_oriharakohei",
                "ms_tsumugiwenders",
                "ms_tsukimiyaayu",
                "ms_natsumekyousuke",
                "ms_nakamurayuri"
            ],
            card: [],
            skill: []
        }
    };
});