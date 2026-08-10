'use strict';
game.import("extension", function (lib, game, ui, get, ai, _status) {
    return {
        name: "萌神再临_林", // 扩展包的内部名称
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
                    //森川由崎
                    "ms_yuzaki": ["female", "qun", 3, ["ms_zhangbi", "ms_jiaoxin"], ["des:森川由崎", "ext:mengshen04/ms_yuzaki.jpg"]],

                    //鉴纯夏
                    "ms_jianchunxia": ["female", "qun", 3, ["ms_qinfan", "ms_tianjiao"], ["des:鉴纯夏", "ext:mengshen04/ms_jianchunxia.jpg"]],

                    //间桐樱
                    "ms_jiantongying": ["female", "qun", 3, ["ms_zhanmeng", "ms_liangfu"], ["des:间桐樱", "ext:mengshen04/ms_jiantongying.jpg"]],

                    //伊藤诚
                    "ms_yitoucheng": ["male", "qun", 4, ["ms_duojia"], ["des:一条区哈哈", "ext:mengshen04/ms_yitoucheng.jpg"]],

                    //有家小雪
                    "ms_youjiaxiaoxue": ["female", "qun", 3, ["ms_fuzui", "ms_chiming"], ["des:一条区哈哈", "ext:mengshen04/ms_youjiaxiaoxue.jpg"]],

                    //由佳
                    "ms_yuka": ["female", "qun", 4, ["ms_canshi"], ["des:由佳", "ext:mengshen04/ms_yuka.jpg"]],

                    //湊柊
                    "ms_minato": ["male", "qun", 4, ["ms_juzhao"], ["des:湊柊一郎", "ext:mengshen04/ms_minato.jpg"]],

                    //林翩翩
                    "ms_pianpian": ["female", "qun", 3, ["ms_zixiang", "ms_cuidu"], ["des:好妻子", "ext:mengshen04/ms_pianpian.jpg"]],

                    //奈美
                    "ms_naimei": ["female", "qun", 3, ["ms_sibu", "ms_mishi"], ["des:奈美", "ext:mengshen04/ms_naimei.jpg"]],

                    //珀尔诺
                    "ms_poernuo": ["female", "qun", 3, ["ms_zhaomu", "ms_huanlve"], ["des:珀尔诺", "ext:mengshen04/ms_poernuo.jpg"]],

                    //西园寺世界
                    "ms_xiyuansishijie": ["female", "qun", "3/4", ["ms_zhashi", "ms_xueqie"], ["des:《School Days》中的女主角之一。青浦高中1年3班的学生。", "ext:mengshen04/ms_xiyuansishijie.jpg"]],

                    //稀世良
                    "ms_xishiliang": ["female", "qun", 4, ["ms_suiliu"], ["des:【稀世良】", "ext:mengshen04/ms_xishiliang.jpg"]],

                    //奥莉耶塔
                    "ms_aoliyeta": ["female", "qun", 3, ["ms_shujie", "ms_lunqi"], ["des:", "ext:mengshen04/ms_aoliyeta.jpg"]],
                },

                // 1.2 登记所有需要在游戏界面中显示的中文翻译（包括武将名、技能名、技能描述）
                translate: {
                    // --- 扩展包名字翻译 ---
                    "extension_mengshen04_name": "萌神再临_林",
                    ms_yuzaki: "森川由崎",
                    ms_jianchunxia: "鉴纯夏",
                    ms_jiantongying: "间桐樱",
                    ms_yitoucheng: "伊藤诚",
                    ms_youjiaxiaoxue: "有家小雪",
                    ms_yuka: "由佳",
                    ms_minato: "湊柊一郎",
                    ms_pianpian: "林翩翩",
                    ms_naimei: "奈美",
                    ms_poernuo: "珀尔诺",
                    ms_xiyuansishijie: "西园寺世界",
                    ms_xishiliang: "稀世良",
                    ms_aoliyeta: "奥莉耶塔",
                }
            },

            // ---------------- 2. 卡牌注册区 ----------------
            // （目前保留框架即可）
            card: {
                card: {},
                translate: {},
                list: []
            },

            // ---------------- 3. 技能代码区 ----------------
            skill: {
                // 这里是整个扩展的核心，所有武将的技能逻辑代码全部写在这里面
                skill: {

                    //———————————森川由崎———————————

                    "ms_zhangbi": {
                        group: ["ms_zhangbi_start", "ms_zhangbi_limit"],
                        locked: true,
                        // 初始化时暴力扩充各装备栏的容量，配合后续的数量限制达成“任意搭配且上限为7”的效果
                        init: function (player, skill) {
                            if (!player.expandedSlots) player.expandedSlots = {};
                            for (var i = 1; i <= 6; i++) {
                                player.expandedSlots['equip' + i] = (player.expandedSlots['equip' + i] || 0) + 6;
                            }
                            player.storage.ms_zhangbi_slots = true;
                        },
                        onremove: function (player, skill) {
                            if (player.storage.ms_zhangbi_slots) {
                                for (var i = 1; i <= 6; i++) {
                                    player.expandedSlots['equip' + i] -= 6;
                                    if (player.expandedSlots['equip' + i] <= 0) {
                                        delete player.expandedSlots['equip' + i];
                                    }
                                }
                                delete player.storage.ms_zhangbi_slots;
                            }
                        },
                        subSkill: {
                            start: {
                                // 改用 gameDrawAfter 确保牌堆和手牌都已经完全初始化完毕
                                trigger: { global: "gameDrawAfter", player: "enterGame" },
                                forced: true,
                                filter: function (event, player) {
                                    return event.name == 'gameDraw' || event.player == player;
                                },
                                content: function () {
                                    "step 0"
                                    // 为了绝对稳定，直接从本局游戏的卡牌字典中生成7张真实的装备牌
                                    var list = [];
                                    for (var i = 0; i < lib.card.list.length; i++) {
                                        var cardName = lib.card.list[i][2];
                                        if (get.type(cardName) == 'equip') {
                                            list.push(lib.card.list[i]);
                                        }
                                    }
                                    var cards = [];
                                    for (var i = 0; i < 7; i++) {
                                        if (list.length > 0) {
                                            var info = list.randomGet();
                                            // info的格式为: [花色, 点数, 牌名, 属性]
                                            cards.push(game.createCard(info[2], info[0], info[1], info[3]));
                                        }
                                    }
                                    event.cards = cards;
                                    "step 1"
                                    if (event.cards && event.cards.length > 0) {
                                        var c = event.cards.shift();
                                        player.$gain2(c, false); // 播放一个获得卡牌的浮空小动画
                                        player.equip(c);         // 强制穿上装备
                                        event.redo();            // 循环此 step 直到7张牌全部穿上
                                    } else {
                                        game.log(player, '触发了【障壁】');
                                    }
                                }
                            },
                            limit: {
                                // 监听装备改变，随时把关最多只能穿7件
                                trigger: { player: "equipAfter" },
                                forced: true,
                                filter: function (event, player) {
                                    return player.getCards('e').length > 7;
                                },
                                content: function () {
                                    var num = player.getCards('e').length - 7;
                                    player.chooseToDiscard('e', true, num, '障壁：你的装备区只能容纳七件装备，请弃置多余的装备牌');
                                }
                            }
                        }
                    },


                    "ms_jiaoxin": {
                        // 监听记录技能事件（无名杀中发动装备技能必然会触发 logSkill）
                        trigger: { player: "logSkill" },
                        filter: function (event, player) {
                            var equips = player.getCards('e');
                            var targetCard = null;
                            for (var i = 0; i < equips.length; i++) {
                                var info = get.info(equips[i]);
                                if (info && info.skills && info.skills.includes(event.skill)) {
                                    targetCard = equips[i];
                                    break;
                                }
                            }
                            if (!targetCard) return false;

                            var subtype = get.subtype(targetCard);
                            if (subtype != 'equip1' && subtype != 'equip2') return false;

                            var opp = null;
                            var useEvt = event.getParent('useCard');
                            if (!useEvt || !useEvt.card || useEvt.card.name != 'sha') return false;

                            // 判定武器：必须是我方使用的杀
                            if (subtype == 'equip1' && useEvt.player == player) {
                                var subEvt = event.getParent('damage') || event.getParent('shaMiss') || event.getParent('shaBefore');
                                if (subEvt && subEvt.player && subEvt.player != player && useEvt.targets.includes(subEvt.player)) {
                                    opp = subEvt.player;
                                } else if (useEvt.targets && useEvt.targets.length > 0) {
                                    opp = useEvt.targets[0];
                                }
                            }
                            // 判定防具：必须是被敌方的杀指定
                            else if (subtype == 'equip2' && useEvt.targets.includes(player)) {
                                opp = useEvt.player;
                            }

                            if (!opp || opp == player) return false;

                            // 缓存判断出来的信息供 content 使用
                            player.storage.ms_jiaoxin_info = {
                                card: targetCard,
                                opp: opp
                            };
                            return true;
                        },
                        content: function () {
                            "step 0"
                            var info = player.storage.ms_jiaoxin_info;
                            if (!info || !info.card || !info.opp) { event.finish(); return; }
                            event.targetCard = info.card;
                            event.opp = info.opp;

                            player.chooseBool('是否发动【交心】？<br>将 ' + get.translation(event.targetCard) + ' 移入 ' + get.translation(event.opp) + ' 的装备区，弃置其两张手牌并视为对其使用一张【杀】。').set('frequent', true);
                            "step 1"
                            if (result.bool) {
                                player.logSkill('ms_jiaoxin', event.opp);
                                // 移入对方装备区
                                if (event.targetCard && get.position(event.targetCard) == 'e') {
                                    event.opp.equip(event.targetCard);
                                }
                                event.discardCount = 0;
                            } else {
                                event.finish();
                            }
                            "step 2"
                            // 循环弃置对方两张手牌（由于盲弃需要选择，一次弃置一张执行两次最为稳定）
                            if (event.opp.countCards('h') > 0 && event.discardCount < 2) {
                                player.discardPlayerCard(event.opp, 'h', true);
                                event.discardCount++;
                                event.redo();
                            }
                            "step 3"
                            // 视为对其使用一张杀
                            var sha = game.createCard('sha');
                            player.useCard(sha, event.opp, false);
                        }
                    },

                    // ================= 纯夏 =================

                    // ================= 1. 侵犯 =================
                    "ms_qinfan": {
                        audio: 2,
                        trigger: { player: "phaseUseBegin" },
                        forced: true,
                        content: function () {
                            var cards = player.getCards('h');
                            if (cards.length > 0) {
                                // 随机洗牌
                                cards.randomSort();
                                player.storage.ms_qinfan_pile = cards.slice(0); // 复制一份进入虚拟牌堆

                                // 剥离手中实体
                                player.lose(cards, ui.special, 'to_insert');

                                // 【核心优化】：开启侵犯总开关，激活所有底层授权
                                player.storage.ms_qinfan_active = true;

                                // 顶出第一张
                                var topCard = player.storage.ms_qinfan_pile.shift();
                                player.storage.ms_qinfan_current = topCard; // 直接记录这唯一的物理卡牌
                                player.gain(topCard, 'gain2');

                                player.markSkill('ms_qinfan'); // 点亮底部图标
                            } else {
                                game.log(player, '没有手牌，无法触发', '#g【侵犯】');
                            }
                        },
                        marktext: "侵",
                        intro: {
                            content: function (storage, player) {
                                var num = player.storage.ms_qinfan_pile ? player.storage.ms_qinfan_pile.length : 0;
                                return "当前扣置的卡牌内还有 " + num + " 张牌。";
                            }
                        },
                        // 把三个运行机制永远绑定在身上，靠 ms_qinfan_active 开关管控
                        group: ["ms_qinfan_flow", "ms_qinfan_mod", "ms_qinfan_end"]
                    },
                    // [机制] 当标记牌离开手里时，自动弹出下一张
                    "ms_qinfan_flow": {
                        trigger: { player: "loseAfter" },
                        forced: true,
                        silent: true,
                        filter: function (event, player) {
                            if (!player.storage.ms_qinfan_active) return false;
                            if (!player.storage.ms_qinfan_current) return false;
                            // 精准比对：失去的牌里是否包含了那张独苗
                            for (var i = 0; i < event.cards.length; i++) {
                                if (event.cards[i] === player.storage.ms_qinfan_current) return true;
                            }
                            return false;
                        },
                        content: function () {
                            player.storage.ms_qinfan_current = null;

                            // 如果虚拟牌堆还有子弹，继续上膛
                            if (player.storage.ms_qinfan_pile && player.storage.ms_qinfan_pile.length > 0) {
                                var topCard = player.storage.ms_qinfan_pile.shift();
                                player.storage.ms_qinfan_current = topCard;
                                player.gain(topCard, 'gain2');
                                player.markSkill('ms_qinfan');
                            } else {
                                player.unmarkSkill('ms_qinfan');
                            }
                        }
                    },
                    // [机制] 核心：无视距离与次数（完美拦截物理引用）
                    "ms_qinfan_mod": {
                        mod: {
                            targetInRange: function (card, player, target) {
                                if (player.storage.ms_qinfan_active && player.storage.ms_qinfan_current) {
                                    // 检查实体牌
                                    if (card === player.storage.ms_qinfan_current) return true;
                                    // 检查虚拟转化牌（防转化后引用外包）
                                    if (card.cards && card.cards.includes(player.storage.ms_qinfan_current)) return true;
                                }
                            },
                            cardUsable: function (card, player, num) {
                                if (player.storage.ms_qinfan_active && player.storage.ms_qinfan_current) {
                                    if (card === player.storage.ms_qinfan_current) return Infinity; // 破除次数限制！
                                    if (card.cards && card.cards.includes(player.storage.ms_qinfan_current)) return Infinity;
                                }
                            }
                        }
                    },
                    // [机制] 出牌阶段结束，回收所有剩余牌并关掉开关
                    "ms_qinfan_end": {
                        // 使用 phaseUseAfter 最为稳妥，防止强行跳过阶段卡死
                        trigger: { player: "phaseUseAfter" },
                        forced: true,
                        silent: true,
                        filter: function (event, player) {
                            return player.storage.ms_qinfan_active;
                        },
                        content: function () {
                            player.storage.ms_qinfan_active = false;
                            player.storage.ms_qinfan_current = null;

                            if (player.storage.ms_qinfan_pile && player.storage.ms_qinfan_pile.length > 0) {
                                player.gain(player.storage.ms_qinfan_pile, 'gain2');
                            }
                            player.storage.ms_qinfan_pile = [];
                            player.unmarkSkill('ms_qinfan');
                        }
                    },

                    // ================= 2. 天骄 =================
                    "ms_tianjiao": {
                        audio: 2,
                        trigger: { player: ["useCardAfter", "respondAfter"] },
                        forced: true,
                        filter: function (event, player) {
                            // 【彻底修复】：把 _status.currentPhase !== player 删掉了！
                            // 只要是你每回合首次使用某类型的牌，无论回合内外，统统放行！
                            var type = get.type(event.card);
                            if (!player.storage.ms_tianjiao_used) return true;
                            // 检查本回合是否已用过该类别
                            return !player.storage.ms_tianjiao_used.includes(type);
                        },
                        content: function () {
                            "step 0"
                            var type = get.type(trigger.card);
                            if (!player.storage.ms_tianjiao_used) player.storage.ms_tianjiao_used = [];
                            player.storage.ms_tianjiao_used.push(type);

                            // 爽摸三张！
                            player.draw(3);

                            "step 1"
                            // 检查：必须是自己的回合，且侵犯技能的扣牌流水线正在开启
                            if (_status.currentPhase === player && player.storage.ms_qinfan_active) {
                                // 要求强行选三张牌塞进弹夹
                                player.chooseCard('h', 3, true, '天骄：你必须将三张手牌扣置于角色牌上的最底部').set('ai', function (card) {
                                    return 8 - get.value(card);
                                });
                            } else {
                                // 回合外，或虽然是自己回合但没处于出牌阶段，则爽拿3牌，不扣！
                                event.finish();
                            }

                            "step 2"
                            if (result.bool && result.cards && result.cards.length) {
                                player.lose(result.cards, ui.special, 'to_insert'); // 剥离手牌

                                if (!player.storage.ms_qinfan_pile) player.storage.ms_qinfan_pile = [];

                                // 利用 push 放到底部
                                for (var i = 0; i < result.cards.length; i++) {
                                    player.storage.ms_qinfan_pile.push(result.cards[i]);
                                }
                                player.markSkill('ms_qinfan'); // 刷新弹夹数字UI

                                // 【弹夹为空兜底】：如果你打空的瞬间触发天骄摸牌，立刻自动上膛！
                                if (!player.storage.ms_qinfan_current && player.storage.ms_qinfan_pile.length > 0) {
                                    var topCard = player.storage.ms_qinfan_pile.shift();
                                    player.storage.ms_qinfan_current = topCard;
                                    player.gain(topCard, 'gain2');
                                    player.markSkill('ms_qinfan');
                                }
                            }
                        },
                        group: ["ms_tianjiao_clear"]
                    },
                    // [机制] 每当新的一名角色回合结束/新回合开始时，清理掉使用记录，保证“每回合一次”
                    "ms_tianjiao_clear": {
                        trigger: { global: "phaseAfter" },
                        forced: true,
                        silent: true,
                        content: function () {
                            player.storage.ms_tianjiao_used = [];
                        }
                    },

                    // ================= 间桐樱=================
                    // ================= 1. 占梦 (主动出牌阶段入口) =================
                    "ms_zhanmeng": {
                        audio: 2,
                        enable: "phaseUse",
                        filterCard: function () { return false; },
                        selectCard: -1,
                        filter: function (event, player) {
                            if (player.storage.ms_zhanmeng_disabled) return false;
                            return game.hasPlayer(function (current) { return current.countCards('h') > 0; });
                        },
                        content: function () {
                            "step 0"
                            event.targets = game.filterPlayer(function (current) { return current.countCards('h') > 0; });
                            event.targets.sort(lib.sort.seat);
                            event.shownCards = [];

                            "step 1"
                            if (event.targets.length > 0) {
                                event.currentTarget = event.targets.shift();
                                player.choosePlayerCard(event.currentTarget, 'h', true).set('prompt', '占梦：请抽取并展示 ' + get.translation(event.currentTarget) + ' 的一张手牌').set('ai', function (button) { return Math.random(); });
                            } else {
                                event.goto(3);
                            }

                            "step 2"
                            if (result.bool && result.links && result.links.length > 0) {
                                event.shownCards.push(result.links[0]);
                                event.goto(1);
                            } else {
                                game.log(player, '取消了展示，', '#g【占梦】', '失效');
                                player.storage.ms_zhanmeng_disabled = true;
                                event.finish();
                                return;
                            }

                            "step 3"
                            player.showCards(event.shownCards, get.translation(player) + '发动了【占梦】');

                            // DFS 算牌算法
                            event.findValidCombo = function (cards, targetNum) {
                                var res = null;
                                var dfs = function (index, currentSum, currentCombo) {
                                    if (currentSum === targetNum) { res = currentCombo.slice(0); return true; }
                                    if (currentSum > targetNum || index >= cards.length) return false;
                                    currentCombo.push(cards[index]);
                                    var trans = get.translation(cards[index].name);
                                    var nameLen = trans ? trans.length : cards[index].name.length;
                                    if (dfs(index + 1, currentSum + nameLen, currentCombo)) return true;
                                    currentCombo.pop();
                                    if (dfs(index + 1, currentSum, currentCombo)) return true;
                                    return false;
                                };
                                dfs(0, 0, []);
                                return res;
                            };

                            player.storage.ms_zhanmeng_shownCards = event.shownCards.slice(0);
                            player.storage.ms_zhanmeng_findValidCombo = event.findValidCombo;
                            if (!player.storage.ms_zhanmeng_used) player.storage.ms_zhanmeng_used = [];

                            player.chooseButton(
                                ['占梦：请选择被展示的一张牌作为你要使用的牌', event.shownCards],
                                1
                            ).set('filterButton', function (button, player) {
                                var card = button.link;
                                var type = get.type(card);
                                if (type !== 'basic' && type !== 'trick') return false;

                                // 【第一道防线】：本回合使用过的牌名不能再印
                                if (player.storage.ms_zhanmeng_used && player.storage.ms_zhanmeng_used.includes(card.name)) return false;

                                var num = get.number(card);
                                if (!num) return false;

                                // 【第二道防线：核心拦截】：检查这张牌目前到底能不能用！
                                var evt = _status.event.getParent('phaseUse');
                                var vcard = new lib.element.VCard({ name: card.name, suit: get.suit(card), number: num, nature: get.nature(card), skill: 'ms_zhanmeng' });

                                // 首先，如果这张牌是不允许主动使用的（比如闪、无懈可击、被封印的牌），直接拦死！
                                if (!lib.filter.cardEnabled(vcard, player, evt) || !lib.filter.cardUsable(vcard, player, evt)) return false;
                                // 其次，如果这是一张需要指定目标的牌，场上必须有合法的目标！
                                if (!game.hasPlayer(function (current) { return player.canUse(vcard, current); })) return false;

                                // 【第三道防线】：字数凑不出的不能选
                                return player.storage.ms_zhanmeng_findValidCombo(player.storage.ms_zhanmeng_shownCards, num) !== null;
                            }).set('ai', function (button) {
                                return get.value(button.link, _status.event.player);
                            });

                            "step 4"
                            if (result.bool && result.links && result.links.length > 0) {
                                event.targetCard = result.links[0];
                                event.targetNumber = get.number(event.targetCard);
                            } else {
                                game.log(player, '取消了目标选择，', '#g【占梦】', '失效');
                                player.storage.ms_zhanmeng_disabled = true;
                                event.finish();
                                return;
                            }

                            "step 5"
                            var combo = player.storage.ms_zhanmeng_findValidCombo(player.storage.ms_zhanmeng_shownCards, event.targetNumber);
                            player.chooseButton([
                                '占梦：请选择任意张被展示的牌（牌名字数总和需恰好为 ' + event.targetNumber + '）',
                                player.storage.ms_zhanmeng_shownCards
                            ], [1, player.storage.ms_zhanmeng_shownCards.length]).set('filterButton', function (button) {
                                var sum = 0;
                                for (var i = 0; i < ui.selected.buttons.length; i++) {
                                    var trans1 = get.translation(ui.selected.buttons[i].link.name);
                                    sum += (trans1 ? trans1.length : 1);
                                }
                                var trans2 = get.translation(button.link.name);
                                sum += (trans2 ? trans2.length : 1);
                                return sum <= _status.event.targetNumber;
                            }).set('targetNumber', event.targetNumber).set('aiCombo', combo).set('ai', function (button) {
                                if (_status.event.aiCombo && _status.event.aiCombo.includes(button.link)) return 1;
                                return 0;
                            });

                            "step 6"
                            if (result.bool && result.links && result.links.length > 0) {
                                var sum = 0;
                                for (var i = 0; i < result.links.length; i++) {
                                    var trans = get.translation(result.links[i].name);
                                    sum += (trans ? trans.length : 1);
                                }
                                if (sum !== event.targetNumber) {
                                    if (player.isUnderControl()) {
                                        player.popup('字数和不等于 ' + event.targetNumber + ' !');
                                        event.goto(5);
                                    } else {
                                        player.storage.ms_zhanmeng_disabled = true;
                                        event.finish();
                                    }
                                    return;
                                }
                                event.costCards = result.links.slice(0);
                            } else {
                                game.log(player, '取消了代价选择，', '#g【占梦】', '失效');
                                player.storage.ms_zhanmeng_disabled = true;
                                event.finish();
                                return;
                            }

                            "step 7"
                            // 记入黑名单
                            if (!player.storage.ms_zhanmeng_used) player.storage.ms_zhanmeng_used = [];
                            player.storage.ms_zhanmeng_used.push(event.targetCard.name);
                            player.markSkill("ms_zhanmeng");

                            var map = {};
                            for (var i = 0; i < event.costCards.length; i++) {
                                var c = event.costCards[i];
                                var owner = get.owner(c);
                                if (owner) {
                                    if (!map[owner.playerid]) map[owner.playerid] = { player: owner, cards: [] };
                                    map[owner.playerid].cards.push(c);
                                }
                            }
                            for (var id in map) {
                                map[id].player.discard(map[id].cards);
                            }

                            player.storage.ms_zhanmeng_costCards = event.costCards;

                            var vcard = new lib.element.VCard({
                                name: event.targetCard.name,
                                nature: get.nature(event.targetCard),
                                suit: get.suit(event.targetCard),
                                number: event.targetNumber,
                                isCard: true,
                                cards: event.costCards,
                                skill: 'ms_zhanmeng'
                            });

                            player.chooseUseTarget(vcard, true, false);
                        },
                        mark: true,
                        intro: {
                            content: function (storage, player) {
                                if (!player.storage.ms_zhanmeng_used || player.storage.ms_zhanmeng_used.length === 0) return '尚未当做任何牌使用';
                                var str = '本回合已当做以下牌使用过：<br>';
                                for (var i = 0; i < player.storage.ms_zhanmeng_used.length; i++) {
                                    str += '【' + get.translation(player.storage.ms_zhanmeng_used[i]) + '】 ';
                                }
                                return str;
                            }
                        },
                        group: ["ms_zhanmeng_reset", "ms_zhanmeng_reset_disabled_only", "ms_zhanmeng_mod"]
                    },

                    // ================= 1.1 占梦使用次数限制突破模组 =================
                    "ms_zhanmeng_mod": {
                        mod: {
                            cardUsable: function (card, player, num) {
                                // 我们自己接管了次数管控，底层的限制强行突破
                                if (card && card.skill === 'ms_zhanmeng') {
                                    return Infinity;
                                }
                            }
                        }
                    },

                    // ================= 1.2 占梦牌名池清空 (每回合开始清零) =================
                    "ms_zhanmeng_reset": {
                        trigger: { player: "phaseBegin" },
                        forced: true,
                        silent: true,
                        content: function () {
                            player.storage.ms_zhanmeng_disabled = false;
                            player.unmarkSkill("ms_zhanmeng");
                            player.storage.ms_zhanmeng_used = [];
                        }
                    },

                    // ================= 1.3 占梦失效状态解除 (主动使用了任意真牌后) =================
                    "ms_zhanmeng_reset_disabled_only": {
                        trigger: { player: ["useCardAfter", "respondAfter"] },
                        forced: true,
                        silent: true,
                        filter: function (event, player) {
                            // 只要处于因取消而失效的状态，就解除它
                            return player.storage.ms_zhanmeng_disabled;
                        },
                        content: function () {
                            player.storage.ms_zhanmeng_disabled = false;
                        }
                    },

                    // ================= 2. 良妇 =================
                    "ms_liangfu": {
                        audio: 2,
                        trigger: { player: "useCardAfter" },
                        filter: function (event, player) {
                            if (player.storage.ms_liangfu_used) return false;

                            var hasD = false;
                            // 正常使用进弃牌堆的牌
                            if (event.cards && event.cards.length) {
                                for (var i = 0; i < event.cards.length; i++) {
                                    if (get.position(event.cards[i]) === 'd') hasD = true;
                                }
                            }
                            // 占梦作为代价进弃牌堆的牌
                            if (player.storage.ms_zhanmeng_costCards && player.storage.ms_zhanmeng_costCards.length) {
                                for (var j = 0; j < player.storage.ms_zhanmeng_costCards.length; j++) {
                                    if (get.position(player.storage.ms_zhanmeng_costCards[j]) === 'd') hasD = true;
                                }
                            }
                            return hasD;
                        },
                        content: function () {
                            "step 0"
                            player.storage.ms_liangfu_used = true; // 记录本回合已用

                            event.targetCards = [];
                            if (trigger.cards) {
                                for (var i = 0; i < trigger.cards.length; i++) {
                                    if (get.position(trigger.cards[i]) === 'd') event.targetCards.add(trigger.cards[i]);
                                }
                            }
                            if (player.storage.ms_zhanmeng_costCards) {
                                for (var j = 0; j < player.storage.ms_zhanmeng_costCards.length; j++) {
                                    if (get.position(player.storage.ms_zhanmeng_costCards[j]) === 'd') event.targetCards.add(player.storage.ms_zhanmeng_costCards[j]);
                                }
                                player.storage.ms_zhanmeng_costCards = null;
                            }

                            player.chooseTarget('良妇：你可以将 ' + get.translation(event.targetCards) + ' 交给一名角色', function (card, p, target) {
                                return true;
                            }).set('ai', function (target) {
                                return get.attitude(player, target);
                            });

                            "step 1"
                            if (result.bool && result.targets && result.targets.length) {
                                player.logSkill('ms_liangfu', result.targets[0]);
                                result.targets[0].gain(event.targetCards, 'gain2');
                            }
                        },
                        group: "ms_liangfu_clear"
                    },
                    "ms_liangfu_clear": {
                        trigger: { global: "phaseBefore" }, // 进入下一个任意人的回合时刷新
                        forced: true,
                        silent: true,
                        content: function () {
                            player.storage.ms_liangfu_used = false;
                            player.storage.ms_zhanmeng_costCards = null;
                        }
                    },

                    // ================= 伊藤诚=================
                    // ================= 1. 多驾 (主技能，负责 UI 标记) =================
                    "ms_duojia": {
                        audio: 2,
                        locked: true,
                        mark: true,
                        marktext: "☯",
                        intro: {
                            content: function (storage, player) {
                                if (player.storage.ms_duojia_state) {
                                    return "当前处于【<span style='color:#ff0000'>阳</span>】状态：你的手牌数始终等于体力值。";
                                } else {
                                    return "当前处于【<span style='color:#0000ff'>阴</span>】状态：你的体力值始终等于手牌数。";
                                }
                            }
                        },
                        // 绑定初始器、同步器和切换器
                        group: ["ms_duojia_init", "ms_duojia_sync", "ms_duojia_toggle"]
                    },

                    // ================= 1.1 多驾 (初始化) =================
                    "ms_duojia_init": {
                        // 在所有人起手牌发完之后再触发，防止开局死
                        trigger: { global: "gameDrawAfter", player: "enterGame" },
                        forced: true,
                        silent: true,
                        content: function () {
                            // 初始化为【阴】状态 (false = 阴, true = 阳)
                            player.storage.ms_duojia_state = false;
                            player.markSkill('ms_duojia');

                            // 开局强制同步一次
                            // 因为此时是【阴】，体力值需要看齐手牌数
                            var hc = player.countCards('h');
                            var hp = player.hp;

                            if (hc !== hp) {
                                if (hc > hp) {
                                    player.recover(hc - hp);
                                } else if (hc < hp) {
                                    player.loseHp(hp - hc);
                                }
                            }
                        }
                    },

                    // ================= 1.2 多驾 (强制双向同步器) =================
                    "ms_duojia_sync": {
                        trigger: {
                            player: ["gainAfter", "loseAfter", "loseAsyncAfter", "cardsDiscardAfter", "equipAfter", "changeHpAfter", "recoverAfter", "loseHpAfter"]
                        },
                        forced: true,
                        silent: true,
                        filter: function (event, player) {
                            if (player.storage.ms_duojia_syncing) return false;

                            var state = player.storage.ms_duojia_state;
                            var hc = player.countCards('h');
                            var hp = player.hp;

                            if (state === false) { // 阴：体力等于手牌
                                return hp !== hc;
                            } else { // 阳：手牌等于体力
                                var targetHc = Math.max(0, hp);
                                return hc !== targetHc;
                            }
                        },
                        content: function () {
                            "step 0"
                            player.storage.ms_duojia_syncing = true;

                            var state = player.storage.ms_duojia_state;
                            var hc = player.countCards('h');
                            var hp = player.hp;

                            if (state === false) {
                                // 阴：动体力
                                if (hc > hp) {
                                    player.recover(hc - hp);
                                } else if (hc < hp) {
                                    player.loseHp(hp - hc);
                                }
                                event.goto(2);
                            } else {
                                // 阳：动卡牌
                                var targetHc = Math.max(0, hp);
                                if (hc > targetHc) {
                                    player.chooseToDiscard('h', hc - targetHc, true).set('prompt', '多驾：处于【阳】状态，请弃置 ' + (hc - targetHc) + ' 张手牌以保持与体力值相同').set('ai', function (card) { return 8 - get.value(card); });
                                } else if (hc < targetHc) {
                                    player.draw(targetHc - hc);
                                    event.goto(2);
                                }
                            }

                            "step 1"

                            "step 2"
                            player.storage.ms_duojia_syncing = false;
                        }
                    },

                    // ================= 1.3 多驾 (极简精准抵消拦截器) =================
                    "ms_duojia_toggle": {
                        trigger: { global: ["useCardAfter", "respondAfter"] },
                        forced: true,
                        filter: function (event, player) {
                            if (!event.card) return false;
                            var cardName = event.card.name;

                            // 1. 拦截【无懈可击】抵消锦囊
                            if (cardName === 'wuxie') {
                                var parentWuxie = event.getParent('wuxie');
                                if (parentWuxie && parentWuxie.info_map && parentWuxie.info_map.player) {
                                    var source = parentWuxie.info_map.player;
                                    if (event.player === player && source !== player) return true;
                                    if (event.player !== player && source === player) return true;
                                } else {
                                    var parentUse = event.getParent('useCard');
                                    if (parentUse && parentUse !== event) {
                                        var source = parentUse.player;
                                        if (event.player === player && source !== player) return true;
                                        if (event.player !== player && source === player) return true;
                                    }
                                }
                            }

                            // 2. 拦截【闪】抵消【杀】
                            if (cardName === 'shan') {
                                var parentUse = event.getParent('useCard');
                                if (parentUse && parentUse.card && parentUse.card.name === 'sha') {
                                    var source = parentUse.player;
                                    if (event.player === player && source !== player) return true;
                                    if (event.player !== player && source === player) return true;
                                }
                            }

                            return false;
                        },
                        content: function () {
                            "step 0"
                            // 翻转状态
                            player.storage.ms_duojia_state = !player.storage.ms_duojia_state;

                            var stateStr = player.storage.ms_duojia_state ? '【阳】' : '【阴】';
                            player.popup(stateStr);
                            game.log(player, '的', '#g【多驾】', '切换为了', '#y' + stateStr, '状态');
                            player.markSkill('ms_duojia');

                            // 强制同步资源
                            var state = player.storage.ms_duojia_state;
                            var hc = player.countCards('h');
                            var hp = player.hp;

                            player.storage.ms_duojia_syncing = true;

                            if (state === false && hp !== hc) {
                                if (hc > hp) player.recover(hc - hp);
                                else if (hc < hp) player.loseHp(hp - hc);
                                event.goto(2);
                            } else if (state === true && hc !== Math.max(0, hp)) {
                                var targetHc = Math.max(0, hp);
                                if (hc > targetHc) {
                                    player.chooseToDiscard('h', hc - targetHc, true).set('prompt', '多驾：切换至【阳】状态，请弃置 ' + (hc - targetHc) + ' 张手牌以保持与体力值相同').set('ai', function (card) { return 8 - get.value(card); });
                                } else if (hc < targetHc) {
                                    player.draw(targetHc - hc);
                                    event.goto(2);
                                }
                            } else {
                                event.goto(2);
                            }

                            "step 1"

                            "step 2"
                            player.storage.ms_duojia_syncing = false;
                        }
                    },

                    // ================= 有家小雪 =================
                    "ms_fuzui": {
                        audio: 2,
                        // 统一监听全局伤害，通过 filter 过滤，防止自己打自己时触发两次
                        trigger: { global: "damageAfter" },
                        filter: function (event, player) {
                            // 必须有伤害来源且存活
                            if (!event.source || !event.source.isAlive()) return false;
                            // 受伤者也必须存活
                            if (!event.player || !event.player.isAlive()) return false;
                            // 发动者必须是造成伤害的角色，或者是受伤的角色
                            if (event.player !== player && event.source !== player) return false;
                            return true;
                        },
                        content: function () {
                            "step 0"
                            var source = trigger.source;
                            var victim = trigger.player;
                            event.source = source;
                            event.victim = victim;

                            // 计算受伤角色手牌中缺失的花色数
                            var suits = [];
                            var hCards = victim.getCards('h');
                            for (var i = 0; i < hCards.length; i++) {
                                var suit = get.suit(hCards[i], victim);
                                if (['spade', 'heart', 'club', 'diamond'].includes(suit) && !suits.includes(suit)) {
                                    suits.push(suit);
                                }
                            }
                            event.x = 4 - suits.length;
                            if (event.x < 0) event.x = 0;

                            // 发起询问
                            player.chooseBool('是否发动【抚罪】？令 ' + get.translation(source) + ' 摸 ' + event.x + ' 张牌，然后交给 ' + get.translation(victim) + ' 一张手牌。').set('ai', function () {
                                var p = _status.event.player;
                                var s = _status.event.source;
                                var v = _status.event.victim;
                                // 简单AI：如果是自己打敌人，拒绝；如果是自己被打，同意
                                if (p === s) {
                                    return get.attitude(p, v) > 0 ? 1 : 0;
                                } else {
                                    return 1;
                                }
                            }).set('source', source).set('victim', victim).set('x', event.x);

                            "step 1"
                            if (result.bool) {
                                player.logSkill('ms_fuzui');
                                // 摸X张牌
                                if (event.x > 0) {
                                    event.source.draw(event.x);
                                }
                            } else {
                                event.finish();
                            }

                            "step 2"
                            // 伤害来源必须有手牌，且来源不能是受伤者本人（自己给自己牌没意义）
                            if (event.source.countCards('h') > 0 && event.source !== event.victim) {
                                event.source.chooseCard('h', 1, true, '抚罪：请交给 ' + get.translation(event.victim) + ' 一张手牌').set('ai', function (card) {
                                    if (get.attitude(_status.event.source, _status.event.victim) > 0) return get.value(card);
                                    return 8 - get.value(card); // 扔最没用的牌给敌人
                                }).set('source', event.source).set('victim', event.victim);
                            } else {
                                event.finish();
                            }

                            "step 3"
                            if (result.bool && result.cards && result.cards.length > 0) {
                                event.source.give(result.cards, event.victim);
                            }
                        }
                    },

                    // ================= 2. 迟鸣 =================
                    // ================= 2. 迟鸣 =================
                    "ms_chiming": {
                        audio: 2,
                        enable: "phaseUse",
                        filter: function (event, player) {
                            if (player.countCards('h') === 0) return false;
                            var count = player.storage.ms_chiming_count || 0;
                            var bonus = player.storage.ms_chiming_bonus || 0;
                            return count < (2 + bonus);
                        },
                        filterTarget: function (card, player, target) {
                            return target !== player;
                        },
                        content: function () {
                            "step 0"
                            if (!player.storage.ms_chiming_count) player.storage.ms_chiming_count = 0;
                            player.storage.ms_chiming_count++;

                            event.targetCards = target.getCards('h');

                            var targetSuits = [];
                            for (var i = 0; i < event.targetCards.length; i++) {
                                var suit = get.suit(event.targetCards[i], target);
                                if (['spade', 'heart', 'club', 'diamond'].includes(suit) && !targetSuits.includes(suit)) {
                                    targetSuits.push(suit);
                                }
                            }
                            event.canChoice1 = targetSuits.length >= 4;

                            var controls = [];
                            if (event.canChoice1) controls.push('弃置其中四张不同花色的牌');
                            controls.push('交给其任意张手牌');
                            controls.push('cancel2');

                            player.chooseControl(controls).set('prompt', '迟鸣：观看了 ' + get.translation(target) + ' 的手牌').set('dialog', [
                                get.translation(target) + ' 的手牌',
                                event.targetCards
                            ]).set('ai', function () {
                                var p = _status.event.player;
                                var t = _status.event.target;
                                if (_status.event.canChoice1 && get.attitude(p, t) < 0) return '弃置其中四张不同花色的牌';
                                if (get.attitude(p, t) > 0) return '交给其任意张手牌';
                                return 'cancel2';
                            }).set('canChoice1', event.canChoice1).set('target', target);

                            "step 1"
                            event.choice = result.control;
                            if (event.choice === 'cancel2') {
                                event.finish();
                                return;
                            }

                            if (event.choice === '弃置其中四张不同花色的牌') {
                                player.chooseButton([
                                    '迟鸣：请选择 ' + get.translation(target) + ' 的四张不同花色的手牌弃置',
                                    event.targetCards
                                ], 4, true).set('filterButton', function (button) {
                                    var suit = get.suit(button.link);
                                    if (!['spade', 'heart', 'club', 'diamond'].includes(suit)) return false;
                                    for (var i = 0; i < ui.selected.buttons.length; i++) {
                                        if (get.suit(ui.selected.buttons[i].link) === suit) return false;
                                    }
                                    return true;
                                }).set('ai', function (button) {
                                    return 8 - get.value(button.link);
                                });
                            } else {
                                event.goto(3);
                            }

                            "step 2"
                            if (result.bool && result.links && result.links.length === 4) {
                                target.discard(result.links);
                                target.damage(1, player);

                                if (!player.storage.ms_chiming_bonus) player.storage.ms_chiming_bonus = 0;
                                player.storage.ms_chiming_bonus++;
                            }
                            event.finish();

                            "step 3"
                            player.chooseCard('h', [1, Infinity], '迟鸣：请选择交给 ' + get.translation(target) + ' 的手牌').set('ai', function (card) {
                                if (get.attitude(_status.event.player, _status.event.target) > 0) return 10 - get.value(card);
                                return 0;
                            });

                            "step 4"
                            if (result.bool && result.cards && result.cards.length > 0) {
                                player.give(result.cards, target);

                                var prevCount = player.storage.ms_chiming_give_count || 0;
                                player.storage.ms_chiming_give_count = prevCount + result.cards.length;

                                // 若正好跨越2张的阈值，则触发一次基本牌使用
                                if (player.storage.ms_chiming_give_count >= 2 && prevCount < 2) {
                                    player.chooseToUse(function (card, player, event) {
                                        if (get.type(card) !== 'basic') return false;
                                        return lib.filter.filterCard(card, player, event);
                                    }, '迟鸣：本回合以此法交出的牌已达到两张，你可以使用一张基本牌');
                                }
                            }
                        },
                        group: "ms_chiming_clear"
                    },

                    // ================= 迟鸣记录清理 =================
                    "ms_chiming_clear": {
                        trigger: { global: "phaseBefore" },
                        silent: true,
                        forced: true,
                        content: function () {
                            player.storage.ms_chiming_count = 0;
                            player.storage.ms_chiming_bonus = 0;
                            player.storage.ms_chiming_give_count = 0;
                        }
                    },

                    // ================= 由佳=================
                    // ================= 1. 蚕食（主触发技） =================
                    "ms_canshi": {
                        global: "ms_canshi_active",
                        trigger: { global: "phaseUseBegin" },
                        filter: function (event, player) {
                            return event.player !== player && player.countCards('h') > 0;
                        },
                        check: function (event, player) {
                            return get.attitude(player, event.player) > 0;
                        },
                        prompt2: function (event, player) {
                            return '令 ' + get.translation(event.player) + ' 本阶段可以观看并使用你的手牌。若如此做，你的下个出牌阶段也可以观看并使用其手牌。';
                        },
                        async content(event, trigger, player) {
                            var target = trigger.player;

                            // 1. 将你加入对方的“供牌源”大名单中
                            if (!target.storage.ms_canshi_sources) target.storage.ms_canshi_sources = [];
                            target.storage.ms_canshi_sources.add(player);

                            // 2. 记账：在由佳身上存下这笔债
                            if (!player.storage.ms_canshi_targets) player.storage.ms_canshi_targets = [];
                            player.storage.ms_canshi_targets.add(target);
                        },
                        group: ["ms_canshi_clear", "ms_canshi_myturn"]
                    },

                    // ================= 2. 蚕食·清理后台 =================
                    "ms_canshi_clear": {
                        trigger: { global: "phaseUseAfter" },
                        forced: true, silent: true, popup: false,
                        content: function (event, trigger, player) {
                            // 出牌阶段结束，清空该角色的“供牌源”大名单
                            if (trigger.player && trigger.player.storage.ms_canshi_sources) {
                                delete trigger.player.storage.ms_canshi_sources;
                            }
                        }
                    },

                    // ================= 3. 蚕食·延迟追溯（多目标修复核心） =================
                    "ms_canshi_myturn": {
                        trigger: { player: "phaseUseBegin" },
                        forced: true, silent: true, popup: false,
                        content: function (event, trigger, player) {
                            if (player.storage.ms_canshi_targets && player.storage.ms_canshi_targets.length > 0) {
                                // 过滤出活着的欠债人
                                var valid = player.storage.ms_canshi_targets.filter(function (t) { return t.isIn(); });
                                if (valid.length > 0) {
                                    // 【核心修复】：将所有欠债人一口气加入由佳的“供牌源”大名单
                                    if (!player.storage.ms_canshi_sources) player.storage.ms_canshi_sources = [];
                                    player.storage.ms_canshi_sources.addArray(valid);
                                }
                                // 账目清空
                                player.storage.ms_canshi_targets = [];
                            }
                        }
                    },

                    // ================= 4. 蚕食·出牌面板（支持多目标挑选） =================
                    "ms_canshi_active": {
                        enable: "phaseUse",
                        filter: function (event, player) {
                            // 大名单里必须有人，且至少有一个人手里还有牌，按钮才亮
                            if (!player.storage.ms_canshi_sources || !player.storage.ms_canshi_sources.length) return false;
                            return player.storage.ms_canshi_sources.some(function (t) { return t.isIn() && t.countCards('h') > 0; });
                        },
                        prompt: "观看并使用蚕食对象的手牌",
                        async content(event, trigger, player) {
                            // 筛出名单里此刻存活且有手牌的人
                            var validSources = player.storage.ms_canshi_sources.filter(function (t) { return t.isIn() && t.countCards('h') > 0; });
                            if (!validSources.length) return;

                            var target = validSources[0];

                            // 【新增逻辑】：如果你名单里有超过1个人可以蚕食，让你自己选看谁的牌
                            if (validSources.length > 1) {
                                var chooseResult = await player.chooseTarget('蚕食：请选择你要观看并使用谁的手牌', function (card, player, t) {
                                    return validSources.includes(t);
                                }).set('ai', function (t) { return t.countCards('h'); }).forResult();

                                if (chooseResult && chooseResult.targets && chooseResult.targets.length) {
                                    target = chooseResult.targets[0];
                                } else {
                                    return; // 如果中途取消了选人，就退出技能
                                }
                            }

                            var cards = target.getCards('h');
                            if (!cards.length) return;

                            // ============ 严格使用谋庞统出牌代码 ============
                            var links = await player
                                .chooseButton(['蚕食：是否使用【' + get.translation(target) + '】的其中一张牌？', cards])
                                .set("filterButton", function (button) {
                                    var current = get.player(), card = button.link;
                                    var cardx = get.autoViewAs({ name: get.name(card), nature: get.nature(card) }, [card]);
                                    return current.hasUseTarget(cardx, null, false);
                                })
                                .set("ai", function (button) {
                                    return get.player().getUseValue(button.link);
                                })
                                .forResultLinks();

                            if (links && links.length) {
                                var card = links[0];
                                // 防止异步冲突的最后保险
                                if (get.position(card) !== 'h' || get.owner(card) !== target) return;

                                var cardx = get.autoViewAs({ name: get.name(card), nature: get.nature(card) }, [card]);
                                var owner = get.owner(card);
                                var next = player
                                    .chooseUseTarget(cardx, [card], true, false)
                                    .set("throw", false)
                                    .set("owner", owner)
                                    .set("oncard", function (c) {
                                        var evtOwner = get.event().getParent().owner;
                                        if (evtOwner) evtOwner.$throw(c.cards);
                                    });
                                if (card.name === cardx.name && get.is.sameNature(card, cardx, true)) next.set("viewAs", false);
                                await next;
                            }
                        }
                    },

                    // ================= 聚召 (主技能登记与修饰) =================
                    "ms_juzhao": {
                        zhuanhuanji: true,
                        locked: true,
                        init: function (player) {
                            // 游戏开始时，初始化为状态1（阳：false）
                            player.storage.ms_juzhao_state = false;
                            player.storage.ms_juzhao_history = [];
                        },
                        // 核心规则干涉：解除次数限制 / 封印出牌
                        mod: {
                            cardUsable: function (card, player, num) {
                                // 状态1：你使用牌无次数限制
                                if (!player.storage.ms_juzhao_state) return Infinity;
                            },
                            cardEnabled: function (card, player) {
                                // 状态2：出牌阶段你不能使用牌
                                if (player.storage.ms_juzhao_state && _status.currentPhase === player) return false;
                            }
                        },
                        group: ["ms_juzhao_trigger", "ms_juzhao_active", "ms_juzhao_clear"]
                    },

                    // ================= 聚召·状态2面板 (号令队友出牌) =================
                    "ms_juzhao_active": {
                        enable: "phaseUse",
                        filter: function (event, player) {
                            // 只有在状态2（阴）才能发动此主动面板
                            return player.storage.ms_juzhao_state === true;
                        },
                        filterTarget: lib.filter.notMe,
                        prompt: "聚召：令一名其他角色使用一张牌",
                        async content(event, trigger, player) {
                            var target = event.targets[0];
                            // 强制令目标使用一张牌（由于这是出牌阶段的主动技，若目标取消，你可以继续点其他人，直到有人出牌为止）
                            var next = target.chooseToUse('聚召：请使用一张牌，结算后【' + get.translation(player) + '】将触发过牌与转换')
                                .set('ai', function (card) {
                                    return _status.event.player.getUseValue(card); // AI会尽量出有价值的牌
                                });
                            await next;
                        }
                    },

                    // ================= 聚召·核心中枢 (结算后转换状态与摸牌) =================
                    // ================= 聚召·核心中枢 (结算后转换状态与摸牌) =================
                    "ms_juzhao_trigger": {
                        trigger: { global: "useCardAfter" },
                        forced: true, silent: true, popup: false,
                        filter: function (event, player) {
                            if (!player.storage.ms_juzhao_state) {
                                return event.player === player;
                            } else {
                                var parent = event.getParent('ms_juzhao_active');
                                return parent && parent.player === player;
                            }
                        },
                        async content(event, trigger, player) {
                            var cardUser = trigger.player;

                            // 【机制1】：锁定转换。只要牌打出了，必定切换阴阳状态！
                            player.storage.ms_juzhao_state = !player.storage.ms_juzhao_state;
                            if (player.changeZhuanhuanji) player.changeZhuanhuanji('ms_juzhao');

                            // 【机制2】：摸牌询问
                            if (!player.storage.ms_juzhao_history) player.storage.ms_juzhao_history = [];

                            // 检查这个出牌人本回合是否已经被你成功蹭过摸牌了
                            if (!player.storage.ms_juzhao_history.includes(cardUser)) {

                                var targets = game.filterPlayer(function (current) {
                                    return current.countCards('h') === player.countCards('h');
                                });

                                if (targets.length > 0) {
                                    var chooseResult = await player.chooseTarget('聚召：是否与一名手牌数与你相等的角色各摸一张牌？', function (card, player, target) {
                                        return target.countCards('h') === player.countCards('h');
                                    }).set('ai', function (target) {
                                        return get.attitude(player, target) + (target === player ? -1 : 0);
                                    }).forResult();

                                    // 【核心修复】：只有当你真正选中了目标并点击了“确定”时，才算作消耗了次数！
                                    if (chooseResult && chooseResult.targets && chooseResult.targets.length) {
                                        var target = chooseResult.targets[0];
                                        player.logSkill('ms_juzhao', target);

                                        // 正式将该出牌角色拉入本回合的限次黑名单
                                        player.storage.ms_juzhao_history.push(cardUser);

                                        if (target !== player) {
                                            await target.draw(1);
                                        }
                                        await player.draw(1);
                                    }
                                }
                            }
                        }
                    },

                    // ================= 聚召·后台清理 (每回合重置摸牌次数) =================
                    "ms_juzhao_clear": {
                        trigger: { global: "turnBegin" }, // 每当任意角色的新回合开始时
                        forced: true, silent: true, popup: false,
                        content: function (event, trigger, player) {
                            player.storage.ms_juzhao_history = []; // 清空历史记录
                        }
                    },

                    // ================= 林翩翩=================
                    // ================= 1. 自相 =================
                    "ms_zixiang": {
                        locked: true,
                        mod: {
                            maxHandcard: function (player, num) {
                                return num - player.hp + Math.abs(player.hp);
                            }
                        },
                        group: ["ms_zixiang_record", "ms_zixiang_clear", "ms_zixiang_prevent", "ms_zixiang_phase_recover"]
                    },

                    "ms_zixiang_record": {
                        trigger: { player: "dyingAfter" },
                        forced: true, silent: true, popup: false,
                        filter: function (event, player) {
                            return player.hp > 0;
                        },
                        content: function () {
                            player.storage.ms_zixiang_escaped = true;
                        }
                    },

                    "ms_zixiang_clear": {
                        trigger: { global: "roundStart" },
                        forced: true, silent: true, popup: false,
                        content: function () {
                            player.storage.ms_zixiang_escaped = false;
                        }
                    },

                    "ms_zixiang_prevent": {
                        trigger: { player: "dying" },
                        forced: true,
                        filter: function (event, player) {
                            // 【修改点】：加入 game.roundNumber === 1 的判断，第一轮或本轮脱离过濒死，且体力值小于等于0
                            return (player.storage.ms_zixiang_escaped === true || game.roundNumber === 1) && player.hp <= 0;
                        },
                        content: function () {
                            player.logSkill('ms_zixiang');
                            trigger.cancel();
                        }
                    },

                    "ms_zixiang_phase_recover": {
                        trigger: { player: "phaseBegin" },
                        forced: true,
                        filter: function (event, player) {
                            // 确保是自己的回合，且血量不满
                            return player.hp < player.maxHp;
                        },
                        content: function () {
                            // 重置本轮脱离濒死状态的标记
                            player.storage.ms_zixiang_escaped = false;
                            // 回复体力
                            player.recover(player.maxHp - player.hp);
                        }
                    },

                    // ================= 2. 淬毒 =================
                    "ms_cuidu": {
                        locked: true,
                        mod: {
                            cardUsable: function (card, player, num) {
                                if (player.hp >= 0 && get.type(card) === 'basic') return Infinity;
                            }
                        },
                        group: ["ms_cuidu_use", "ms_cuidu_after"]
                    },

                    "ms_cuidu_use": {
                        trigger: { player: "useCardBegin" },
                        forced: true,
                        filter: function (event, player) {
                            return player.hp <= 0 && get.type(event.card) !== 'basic';
                        },
                        content: function () {
                            player.draw(2);
                        }
                    },

                    "ms_cuidu_after": {
                        trigger: { player: "useCardAfter" },
                        forced: true, popup: false,
                        filter: function (event, player) {
                            if (get.type(event.card) === 'basic') {
                                return player.hp >= 0;
                            } else {
                                return player.hp <= 0;
                            }
                        },
                        content: function () {
                            if (get.type(trigger.card) === 'basic') {
                                if (Math.random() < 0.5) {
                                    player.logSkill('ms_cuidu');
                                    // 将 3 改为 player.maxHp
                                    player.loseHp(player.maxHp);
                                }
                            }
                            else {
                                if (Math.random() < 0.5) {
                                    player.logSkill('ms_cuidu');
                                    // 将 3 改为 player.maxHp
                                    player.recover(player.maxHp);
                                }
                            }
                        }
                    },

                    // ================= 奈美 =================
                    // ================= 1. 死簿 (伤害拦截与主入口) =================
                    "ms_sibu": {
                        audio: 2,
                        trigger: { global: "damageBefore" },
                        filter: function (event, player) {
                            // 1. 每回合限一次
                            if (player.hasSkill('ms_sibu_used')) return false;

                            // 2. 【核心护盾防死锁】：如果是我们在“结账”时造成的伤害，绝对不允许再触发死簿记录自己！
                            if (player.hasSkill('ms_sibu_executing')) return false;

                            return true;
                        },
                        content: function () {
                            "step 0"
                            player.chooseBool('死簿：是否防止 ' + get.translation(trigger.player) + ' 受到的 ' + trigger.num + ' 点伤害并记录？').set('ai', function () {
                                return get.attitude(_status.event.player, _status.event.getTrigger().player) > 0 ? 1 : 0;
                            });

                            "step 1"
                            if (result.bool) {
                                player.logSkill('ms_sibu', trigger.player);

                                // 添加本回合限一次标记
                                player.addTempSkill('ms_sibu_used', 'phaseAfter');

                                if (!player.storage.ms_sibu_record) player.storage.ms_sibu_record = [];

                                player.storage.ms_sibu_record.push({
                                    victim: trigger.player,
                                    num: trigger.num,
                                    nature: trigger.nature,
                                    source: trigger.source
                                });

                                player.markSkill('ms_sibu');
                                trigger.cancel();
                            }
                        },
                        marktext: "簿",
                        intro: {
                            content: function (storage, player) {
                                if (!storage || storage.length === 0) return "当前没有记录任何伤害。";
                                var str = "当前【死簿】记录了以下延期伤害：<br>";
                                for (var i = 0; i < storage.length; i++) {
                                    str += "受害者：<b>" + get.translation(storage[i].victim) + "</b> | 伤害值：<b>" + storage[i].num + "</b><br>";
                                }
                                return str;
                            }
                        },
                        group: ["ms_sibu_active", "ms_sibu_passive"]
                    },
                    "ms_sibu_used": { charlotte: true }, // 回合一次标记
                    "ms_sibu_executing": { charlotte: true }, // 【新增】：账本引爆期的无敌防护罩

                    // ================= 1.1 死簿 (主动结账引爆) =================
                    "ms_sibu_active": {
                        audio: "ms_sibu",
                        enable: "phaseUse",
                        usable: 1, // 出牌阶段限一次
                        filter: function (event, player) {
                            return player.storage.ms_sibu_record && player.storage.ms_sibu_record.length > 0;
                        },
                        content: function () {
                            "step 0"
                            // 【核心】：在引爆前开启“抗反噬结界”
                            player.addTempSkill('ms_sibu_executing');

                            var record = player.storage.ms_sibu_record;
                            // 把账本克隆一份，防止在这个瞬间有其他机制修改账本导致数组越界
                            event.currentRecord = record.slice(0);

                            "step 1"
                            // 逐个派发伤害，而不是一瞬间全打出去（通过异步队列消化防止冲突）
                            if (event.currentRecord.length > 0) {
                                var info = event.currentRecord.shift();
                                if (info.victim && info.victim.isAlive()) {
                                    var source = (info.source && info.source.isAlive()) ? info.source : 'nosource';
                                    info.victim.damage(info.num, info.nature, source);
                                }
                                event.goto(1); // 循环回去打下一个
                            } else {
                                event.goto(2); // 打完跳到清空账本
                            }

                            "step 2"
                            // 伤害全部打完，拆除结界
                            player.removeSkill('ms_sibu_executing');

                            player.chooseBool('死簿：已执行所有记录伤害，是否清除账本记录？').set('ai', function () {
                                return 1;
                            });

                            "step 3"
                            if (result.bool) {
                                player.storage.ms_sibu_record = [];
                                player.unmarkSkill('ms_sibu');
                                game.log(player, '清除了', '#g【死簿】', '的记录');
                            }
                        }
                    },

                    // ================= 1.2 死簿 (受击强制引爆) =================
                    "ms_sibu_passive": {
                        audio: "ms_sibu",
                        trigger: { player: "damageAfter" },
                        forced: true,
                        filter: function (event, player) {
                            // 确保不是自己引爆时自己误伤了自己
                            if (player.hasSkill('ms_sibu_executing')) return false;

                            return player.storage.ms_sibu_record && player.storage.ms_sibu_record.length > 0;
                        },
                        content: function () {
                            "step 0"
                            game.log(player, '受到伤害，触发了', '#g【死簿】', '反噬，强制执行记录的伤害！');

                            player.addTempSkill('ms_sibu_executing'); // 开启防反噬结界
                            event.currentRecord = player.storage.ms_sibu_record.slice(0);

                            "step 1"
                            if (event.currentRecord.length > 0) {
                                var info = event.currentRecord.shift();
                                if (info.victim && info.victim.isAlive()) {
                                    var source = (info.source && info.source.isAlive()) ? info.source : 'nosource';
                                    info.victim.damage(info.num, info.nature, source);
                                }
                                event.goto(1);
                            } else {
                                event.goto(2);
                            }

                            "step 2"
                            player.removeSkill('ms_sibu_executing'); // 关闭结界

                            player.chooseBool('死簿：伤害反噬执行完毕，是否清除账本记录？').set('ai', function () {
                                return 1;
                            });

                            "step 3"
                            if (result.bool) {
                                player.storage.ms_sibu_record = [];
                                player.unmarkSkill('ms_sibu');
                                game.log(player, '清除了', '#g【死簿】', '的记录');
                            }
                        }
                    },

                    // ================= 2. 迷失 =================
                    "ms_mishi": {
                        audio: 2,
                        enable: "phaseUse",
                        filter: function (event, player) {
                            return !player.storage.ms_mishi_disabled; // 未被封印才能使用
                        },
                        filterTarget: function (card, player, target) {
                            return target !== player;
                        },
                        content: function () {
                            "step 0"
                            // 1. 从牌堆顶摸出 4 张牌
                            event.cards = get.cards(4);

                            // 2. 【核心保护机制】：将这4张牌移入“处理区”，让它们出现在画面正中央且不被当做废牌吞掉！
                            game.cardsGotoOrdering(event.cards);
                            game.log(player, '展示了牌堆顶的', event.cards);

                            // 3. 目标秘密选择
                            target.chooseButton(['迷失：请秘密选择一张牌（若与对方相同，技能将失效）', event.cards], 1, true).set('ai', function (button) {
                                return Math.random(); // 瞎猜，模拟心理战
                            });

                            "step 1"
                            // 记录目标的选项
                            if (result.bool && result.links && result.links.length > 0) {
                                event.targetChoice = result.links[0];
                            } else {
                                event.targetChoice = event.cards.randomGet(); // 兜底
                            }

                            // 4. 你自己选择
                            player.chooseButton(['迷失：请秘密选择一张牌，若与对方不同，你将对其使用此牌', event.cards], 1, true).set('ai', function (button) {
                                // AI 尽量选对自己最有利、杀伤性最大的牌
                                return get.value(button.link, _status.event.player);
                            });

                            "step 2"
                            // 记录自己的选项
                            if (result.bool && result.links && result.links.length > 0) {
                                event.playerChoice = result.links[0];
                            } else {
                                event.playerChoice = event.cards.randomGet();
                            }

                            // 揭晓底牌
                            game.log(target, '秘密选择了', event.targetChoice);
                            game.log(player, '秘密选择了', event.playerChoice);

                            // 【安全处理】：将没选中的另外三张牌全部扔进弃牌堆
                            var discardCards = event.cards.slice(0);
                            discardCards.remove(event.playerChoice);
                            game.cardsDiscard(discardCards);

                            if (event.targetChoice === event.playerChoice) {
                                // 同心：封印技能
                                game.log('双方选择相同！', '#g【迷失】', '本回合失效！');
                                player.storage.ms_mishi_disabled = true;
                                game.cardsDiscard(event.playerChoice); // 把选中的也扔了
                                event.finish();
                            } else {
                                // 不同心：对那名角色使用！
                                game.log('双方选择不同！', player, '对', target, '使用', event.playerChoice);

                                // 无名杀的底层 useCard 包容性极强。如果你选了一把武器，它会自动给你穿上；如果你选了杀，它会自动杀目标！
                                // false 代表无视距离等合法性检验，强行对目标使用
                                player.useCard(event.playerChoice, target, false);
                            }
                        },
                        group: "ms_mishi_clear"
                    },

                    // 本回合重置迷失限制
                    "ms_mishi_clear": {
                        trigger: { player: "phaseUseAfter" },
                        forced: true,
                        silent: true,
                        content: function () {
                            player.storage.ms_mishi_disabled = false;
                        }
                    },

                    // ================= 珀尔诺 =================
                    // ================= 1. 招募 =================
                    "ms_zhaomu": {
                        audio: 2,
                        trigger: { player: ["phaseZhunbeiBefore", "phaseJudgeBefore", "phaseDrawBefore", "phaseUseBefore", "phaseDiscardBefore", "phaseJieshuBefore"] },
                        filter: function (event, player) {
                            return player.countCards('he') > 0;
                        },
                        content: function () {
                            "step 0"
                            // 【绝杀修复】：trigger.name 就是纯净的 phaseDiscard 等阶段名，千万不能切！
                            var phaseName = trigger.name;
                            var phaseList = ['phaseZhunbei', 'phaseJudge', 'phaseDraw', 'phaseUse', 'phaseDiscard', 'phaseJieshu'];
                            event.phaseIndex = phaseList.indexOf(phaseName) + 1; // 得出 1 到 6 的整数

                            var phaseTrans = {
                                'phaseZhunbei': '准备', 'phaseJudge': '判定', 'phaseDraw': '摸牌',
                                'phaseUse': '出牌', 'phaseDiscard': '弃牌', 'phaseJieshu': '结束'
                            }[phaseName];

                            player.chooseToDiscard('he', 1, '招募：是否弃置一张牌跳过你的' + phaseTrans + '阶段？').set('ai', function (card) {
                                var p = _status.event.player;
                                var phase = _status.event.phaseName;
                                if (phase === 'phaseDiscard') return 8 - get.value(card);
                                if (phase === 'phaseJudge' && p.countCards('j') > 0) return 8 - get.value(card);
                                return 0;
                            }).set('phaseName', phaseName);

                            "step 1"
                            // 如果成功弃牌了
                            if (result.bool && result.cards && result.cards.length) {
                                player.logSkill('ms_zhaomu');
                                trigger.cancel();
                                game.log(player, '跳过了', get.translation(trigger.name), '阶段');

                                // 记录场上的牌数 X
                                event.X = player.countCards('ej');

                                // 效果1：前 X 个阶段 -> 移动场上一张牌
                                if (event.phaseIndex <= event.X && player.canMoveCard()) {
                                    player.chooseBool('是否移动场上的一张牌？').set('ai', function () {
                                        return player.canMoveCard(true) ? 1 : 0;
                                    });
                                } else {
                                    event.goto(3); // 如果不满足，直接跳去判定出杀
                                }
                            } else {
                                // 如果取消了弃牌，整个技能直接结束
                                event.finish();
                            }

                            "step 2"
                            if (result.bool) {
                                // 调取原生移牌 API
                                player.moveCard(true);
                            }

                            "step 3"
                            // 无论前面有没有移牌，都会来到这里结算效果2
                            // 效果2：后 X 个阶段 -> 视为使用一张【杀】
                            if (event.phaseIndex >= 7 - event.X) {
                                var vcard = new lib.element.VCard({ name: 'sha', isCard: true });
                                if (game.hasPlayer(function (current) { return player.canUse(vcard, current); })) {
                                    player.chooseUseTarget(vcard, '招募：你可以视为使用一张【杀】', false);
                                }
                            }
                        },
                        group: ["ms_zhaomu_monitor", "ms_zhaomu_end"]
                    },
                    // [机制] 监听是否使用过“非装备的手牌”
                    "ms_zhaomu_monitor": {
                        trigger: { player: "useCardBefore" },
                        forced: true,
                        silent: true,
                        filter: function (event, player) {
                            if (!event.cards || event.cards.length === 0) return false;
                            if (_status.currentPhase !== player) return false;

                            for (var i = 0; i < event.cards.length; i++) {
                                var c = event.cards[i];
                                if (c.isVirtual) continue;
                                if (get.position(c) === 'h' && get.type(c) !== 'equip') return true;
                            }
                            return false;
                        },
                        content: function () {
                            player.storage.ms_zhaomu_failed = true; // 破功标志
                        }
                    },
                    // [机制] 结束阶段的摸牌清算
                    "ms_zhaomu_end": {
                        trigger: { player: "phaseAfter" },
                        forced: true,
                        filter: function (event, player) {
                            if (player.storage.ms_zhaomu_failed) return false;
                            return player.countCards('ej') > 0;
                        },
                        content: function () {
                            var x = player.countCards('ej');
                            game.log(player, '本回合未使用过非装备的手牌，触发', '#g【招募】', '摸牌');
                            player.draw(x);
                        },
                        onremove: true,
                        group: "ms_zhaomu_clear"
                    },
                    "ms_zhaomu_clear": {
                        trigger: { global: "phaseBefore" },
                        forced: true,
                        silent: true,
                        content: function () {
                            player.storage.ms_zhaomu_failed = false;
                        }
                    },
                    // ================= 2. 缓略 =================
                    "ms_huanlve": {
                        audio: 2,
                        enable: ["chooseToUse", "chooseToRespond"],
                        filterCard: function () { return false; },
                        selectCard: -1,
                        filter: function (event, player) {
                            if (player.countCards('he') === 0) return false;

                            // 检查判定区是否有空位可贴
                            var canAdd = player.canAddJudge({ name: "lebu" }) ||
                                player.canAddJudge({ name: "bingliang" }) ||
                                player.canAddJudge({ name: "shandian" });
                            if (!canAdd) return false;

                            // 检查事件是否索要基本牌
                            var isBasicNeeded = false;
                            var basicNames = ['sha', 'shan', 'tao', 'jiu'];
                            for (var i = 0; i < basicNames.length; i++) {
                                try {
                                    if (event.filterCard({ name: basicNames[i], isCard: true }, player, event)) {
                                        isBasicNeeded = true;
                                        break;
                                    }
                                } catch (e) { }
                            }
                            return isBasicNeeded;
                        },
                        chooseButton: {
                            dialog: function (event, player) {
                                var basicNames = ['sha', 'shan', 'tao', 'jiu'];
                                var list = [];
                                for (var i = 0; i < basicNames.length; i++) {
                                    try {
                                        if (event.filterCard({ name: basicNames[i], isCard: true }, player, event)) {
                                            list.push(['基本', '', basicNames[i]]);
                                        }
                                    } catch (e) { }
                                }
                                return ui.create.dialog("缓略：请选择你要视为使用的基本牌", [list, "vcard"], 'hidden');
                            },
                            filter: function (button, player) { return true; },
                            check: function (button) { return 1; },
                            backup: function (links, player) {
                                var basicName = links[0][2];

                                return {
                                    filterCard: function (card, player) { return true; },
                                    selectCard: 1,
                                    position: "he",
                                    popname: true,

                                    // 必须切断底层的物理回收，我们来亲自处理
                                    discard: false,
                                    lose: false,
                                    delay: false,

                                    // 提供给底层打出/使用的纯净虚拟基本牌
                                    viewAs: { name: basicName, isCard: true, skill: 'ms_huanlve' },

                                    // 弹出选择延时锦囊的文字框
                                    precontent: function () {
                                        "step 0"
                                        var choices = [];
                                        if (player.canAddJudge({ name: "lebu" })) choices.push('lebu');
                                        if (player.canAddJudge({ name: "bingliang" })) choices.push('bingliang');
                                        if (player.canAddJudge({ name: "shandian" })) choices.push('shandian');

                                        var choiceTrans = [];
                                        for (var i = 0; i < choices.length; i++) choiceTrans.push(get.translation(choices[i]));

                                        player.chooseControl(choices).set('choiceList', choiceTrans).set('prompt', '缓略：请选择你要对自己使用的延时锦囊').set('ai', function () {
                                            return choices.randomGet();
                                        });

                                        "step 1"
                                        event.result.delayName = result.control;
                                    },

                                    // 在实体牌被系统清空前，将其塞入判定区
                                    onuse: function (result, player) {
                                        if (result.cards && result.cards.length > 0) {
                                            var costCard = result.cards[0];
                                            var delayName = result.delayName || 'lebu';

                                            // 【终极防报错黑科技】：
                                            // 创造一张具备完整 DOM 结构的“真实卡牌”，不仅带有延时锦囊的名字，还完美继承了原牌的花色、点数！
                                            var judgeCard = game.createCard({
                                                name: delayName,
                                                suit: get.suit(costCard),
                                                number: get.number(costCard),
                                                nature: get.nature(costCard),
                                                cards: [costCard] // 把代价牌包裹在内
                                            });

                                            // 必须先将代价牌剥离手牌区，否则引擎会困惑
                                            player.lose(costCard, ui.special, 'to_insert');

                                            // 调用原生的 addJudge 放进判定区。因为它是 game.createCard 生成的完整卡牌，绝对不可能报 reading '0' 的错！
                                            player.addJudge(judgeCard);
                                            game.log(player, '将', costCard, '当做', '#y【' + get.translation(delayName) + '】', '置入了判定区');

                                            // 【极其关键】：把传给上层的代价牌清空！
                                            // 因为这层是“基本牌”的结算流，我们要让引擎认为这张基本牌是凭空变出来的（代价已经进了判定区），防止它去弃牌堆找牌导致崩溃。
                                            result.cards = [];
                                        }
                                    }
                                };
                            },
                            prompt: function (links, player) {
                                return "将一张牌当做延时锦囊对自己使用，以视为使用/打出【" + get.translation(links[0][2]) + "】";
                            }
                        },
                        ai: {
                            save: true,
                            respondSha: true,
                            respondShan: true,
                            skillTagFilter: function (player, tag, arg) {
                                if (player.countCards('he') === 0) return false;
                                return player.canAddJudge({ name: "lebu" }) ||
                                    player.canAddJudge({ name: "bingliang" }) ||
                                    player.canAddJudge({ name: "shandian" });
                            },
                            order: 3
                        }
                    },

                    // ================= 世界 =================


                    "ms_zhashi": {
                        audio: 2,
                        locked: true,
                        // 监听全场任意角色的体力值发生变化
                        trigger: { global: "changeHpAfter" },
                        filter: function (event, player) {
                            var target = event.player;
                            if (!target.isAlive()) return false;

                            // 检查该角色的体力值是否为全场最低（包括并列最低）
                            var isLowest = true;
                            var players = game.filterPlayer();
                            for (var i = 0; i < players.length; i++) {
                                if (players[i].hp < target.hp) {
                                    isLowest = false;
                                    break;
                                }
                            }
                            return isLowest;
                        },
                        content: function () {
                            player.logSkill('ms_zhashi', trigger.player);
                            player.draw();
                        }
                    },

                    // ================= 2. 雪切 =================
                    "ms_xueqie": {
                        audio: 2,
                        trigger: { player: "useCard" },
                        forced: true,
                        filter: function (event, player) {
                            if (!player.isPhaseUsing()) return false;
                            if (!event.targets || event.targets.length === 0) return false;

                            var tagDamage = get.tag(event.card, 'damage');
                            var hasUnequal = false;
                            var hasEqualSha = false;

                            // 检查1：使用了伤害牌，且场上还有未被指定的、体力不同的人（用来触发追加）
                            if (tagDamage && game.hasPlayer(function (current) { return current.hp !== player.hp && !event.targets.includes(current); })) {
                                hasUnequal = true;
                            }
                            // 检查2：使用了杀，且目标中有体力相等的人，且你已损失体力（用来触发附加效果）
                            if (event.card.name === 'sha' && player.maxHp > player.hp) {
                                for (var i = 0; i < event.targets.length; i++) {
                                    if (event.targets[i].hp === player.hp) {
                                        hasEqualSha = true; break;
                                    }
                                }
                            }

                            return hasUnequal || hasEqualSha;
                        },
                        content: function () {
                            "step 0"
                            event.hasUnequal = false;
                            event.hasEqualSha = false;

                            var tagDamage = get.tag(trigger.card, 'damage');
                            if (tagDamage && game.hasPlayer(function (current) { return current.hp !== player.hp && !trigger.targets.includes(current); })) {
                                event.hasUnequal = true;
                            }
                            if (trigger.card.name === 'sha' && player.maxHp > player.hp) {
                                for (var i = 0; i < trigger.targets.length; i++) {
                                    if (trigger.targets[i].hp === player.hp) {
                                        event.hasEqualSha = true; break;
                                    }
                                }
                            }

                            // 效果2：为【杀】附加特效
                            if (event.hasEqualSha) {
                                event.numToChoose = Math.min(player.maxHp - player.hp, 3);
                                event.choices = ['伤害加一', '不可响应', '不计入次数'];
                                event.chosen = [];
                            } else {
                                // 没触发效果2，直接跳去处理追加目标
                                event.goto(3);
                                return;
                            }

                            "step 1"
                            // 循环弹窗，直到选满或者玩家主动取消
                            if (event.numToChoose <= 0 || event.choices.length === 0) {
                                event.goto(3);
                                return;
                            }

                            var pstr = '雪切：请为本次【杀】附加效果（还可选择 ' + event.numToChoose + ' 个）';
                            var controls = event.choices.slice(); // 拷贝一份选项
                            controls.push('cancel2'); // 允许结束选择

                            player.chooseControl(controls).set('prompt', pstr).set('ai', function () {
                                var c = _status.event.controls;
                                if (c.includes('不可响应')) return '不可响应';
                                if (c.includes('伤害加一')) return '伤害加一';
                                if (c.includes('不计入次数') && _status.event.player.getCardUsable('sha') <= 0) return '不计入次数';
                                return 'cancel2';
                            });

                            "step 2"
                            if (result.control !== 'cancel2' && result.control) {
                                event.chosen.push(result.control);
                                event.choices.remove(result.control); // 选过的不能再选
                                event.numToChoose--;
                                event.goto(1); // 跳回去接着选
                            } else {
                                event.goto(3); // 点取消，直接去结算
                            }

                            "step 3"
                            if (event.hasEqualSha && event.chosen && event.chosen.length > 0) {
                                player.logSkill('ms_xueqie');
                                game.log(player, '对本次【杀】附加了', '#y' + event.chosen.join('、'), '效果');

                                if (event.chosen.includes('不可响应')) {
                                    trigger.directHit.addArray(game.players).addArray(game.dead);
                                    game.log(trigger.card, '不可被响应');
                                }
                                if (event.chosen.includes('不计入次数')) {
                                    // 【核心真理】：直接将底层计数器扣减，实现完美“退还/免单”！
                                    // 只要你不点这个选项，这张杀就会正常消耗次数，你没诸葛连弩就不能出下一张杀！
                                    if (player.getStat().card.sha > 0) {
                                        player.getStat().card.sha--;
                                    }
                                    game.log(trigger.card, '不计入次数');
                                }
                                if (event.chosen.includes('伤害加一')) {
                                    if (typeof trigger.baseDamage !== 'number') trigger.baseDamage = 1;
                                    trigger.baseDamage++;
                                    game.log(trigger.card, '的伤害值基数+1');
                                }
                            }

                            "step 4"
                            // 效果1：【追加目标】逻辑
                            if (event.hasUnequal) {
                                // 【唯一改动点】：加入 [1, Infinity] 解除选择人数限制，同时微调了提示文本中的“一名”为“任意名”
                                player.chooseTarget('雪切：你可以追加任意名体力值与你不相等的角色为目标（无视距离）', [1, Infinity], function (card, p, target) {
                                    return target.hp !== p.hp && !_status.event.sourceTargets.includes(target);
                                }).set('sourceTargets', trigger.targets).set('ai', function (target) {
                                    return get.effect(target, _status.event.getTrigger().card, _status.event.player, _status.event.player);
                                });
                            } else {
                                event.finish();
                            }

                            "step 5"
                            if (result.bool && result.targets && result.targets.length) {
                                player.logSkill('ms_xueqie', result.targets);
                                // 追加目标进大名单，让这张牌砸过去！
                                trigger.targets.addArray(result.targets);
                                game.log(player, '将', result.targets, '追加为目标');
                            }
                        }
                    },

                    // 【随流】主技能
                    //______________稀世良______________________
                    // 【随流】主技能
                    ms_suiliu: {
                        group: ["ms_suiliu_replace", "ms_suiliu_give"]
                    },

                    // 仅有红字的【随流】（赋予他人）
                    "ms_suiliu_red": {
                        charlotte: true,
                        mark: true,
                        intro: {
                            // 【文本修正】：去掉了“结束与准备”，让游戏内提示与实际红字逻辑相符
                            content: "锁定技，你的判定、摸牌、弃牌阶段改为出牌阶段，出牌阶段开始时，你摸一张牌或使用一张牌，然后立刻结束此阶段。"
                        },
                        group: ["ms_suiliu_replace"]
                    },

                    // 阶段拦截器（核心修复部分）
                    "ms_suiliu_replace": {
                        trigger: {
                            player: [
                                "phaseZhunbeiBefore",
                                "phaseJudgeBefore",
                                "phaseDrawBefore",
                                "phaseUseBefore",
                                "phaseDiscardBefore",
                                "phaseJieshuBefore"
                            ]
                        },
                        forced: true,
                        priority: 100,
                        popup: false,
                        filter: function (event, player) {
                            // 在无名杀底层，虽然时机是 phaseZhunbeiBefore，但事件对象的 name 是 "phaseZhunbei"
                            var phase = event.name;

                            // 如果是准备阶段或结束阶段，必须拥有原版【随流】才允许拦截
                            if (phase === "phaseZhunbei" || phase === "phaseJieshu") {
                                return player.hasSkill("ms_suiliu"); // 红字版没有这个技能，在此处返回 false，直接放行
                            }

                            // 其他四个阶段（判定、摸牌、出牌、弃牌）所有人都会被拦截
                            return true;
                        },
                        content: function () {
                            "step 0"
                            trigger.cancel();

                            var phaseTrans = lib.translate[trigger.name] || '阶段';

                            // 【体验优化】：如果本身就是出牌阶段，日志说“将出牌阶段改为出牌阶段”有点蠢，这里做个区分
                            if (trigger.name === "phaseUseBefore") {
                                game.log(player, '触发了', '#g【随流】');
                            } else {
                                game.log(player, '将', '#g' + phaseTrans, '改为出牌阶段（随流）');
                            }

                            player.chooseToUse({
                                prompt: '随流：请使用一张牌',
                                prompt2: '若点击“取消”，则摸一张牌，然后立刻结束此阶段'
                            });
                            "step 1"
                            if (!result.bool) {
                                player.draw();
                            }
                        }
                    },

                    // 受到/造成伤害时赋予红字随流
                    "ms_suiliu_give": {
                        // 【核心修复】：同时监听你作为受害者（player）和你作为伤害来源（source）的时机
                        trigger: {
                            player: "damageAfter",
                            source: "damageAfter"
                        },
                        direct: true,
                        filter: function (event, player) {
                            // 【逻辑优化】：原文为“每回合首次”，这里用 _status.currentPhase (当前回合角色) 来精确判定是否处于同一个回合，避免多阶段跨越导致的重置 Bug
                            if (player.storage.ms_suiliu_turn === _status.currentPhase) return false;
                            return true;
                        },
                        content: function () {
                            "step 0"
                            // 记录当前回合，确保本回合不再触发
                            player.storage.ms_suiliu_turn = _status.currentPhase;

                            player.chooseTarget(get.prompt('ms_suiliu'), '可以令一名无“随流”角色获得只有红色字体的“随流”直到其下个回合结束', function (card, player, target) {
                                return !target.hasSkill('ms_suiliu') && !target.hasSkill('ms_suiliu_red');
                            }).set('ai', function (target) {
                                var player = _status.event.player;
                                if (target.countCards('h') < 2) return get.attitude(player, target);
                                return -get.attitude(player, target);
                            });
                            "step 1"
                            if (result.bool && result.targets.length) {
                                var target = result.targets[0];
                                player.logSkill('ms_suiliu', target);
                                target.addSkill('ms_suiliu_red');
                                target.addSkill('ms_suiliu_clear');
                            }
                        }
                    },

                    // 倒计时清理（此部分保持稳定不变）
                    ms_suiliu_clear: {
                        init: function (player) {
                            if (_status.currentPhase === player) {
                                player.storage.ms_suiliu_clear_count = 0;
                            } else {
                                player.storage.ms_suiliu_clear_count = 1;
                            }
                        },
                        trigger: { player: "phaseAfter" },
                        forced: true,
                        charlotte: true,
                        popup: false,
                        content: function () {
                            player.storage.ms_suiliu_clear_count++;
                            if (player.storage.ms_suiliu_clear_count >= 2) {
                                player.removeSkill('ms_suiliu_red');
                                player.removeSkill('ms_suiliu_clear');
                                delete player.storage.ms_suiliu_clear_count;
                                game.log(player, '的', '#g【随流】', '已失效');
                            }
                        }
                    },

                    // ================= 奥莉耶塔：数劫 =================
                    // ================= 奥莉耶塔：数劫 (重铸逻辑修正版) =================
                    "ms_shujie": {
                        trigger: {
                            player: [
                                "phaseZhunbeiBegin",
                                "phaseJudgeBegin",
                                "phaseDrawBegin",
                                "phaseUseBegin",
                                "phaseDiscardBegin",
                                "phaseJieshuBegin"
                            ]
                        },
                        direct: true,
                        async content(event, trigger, player) {

                            var chooseTargetResult = await player.chooseTarget(
                                get.prompt('ms_shujie'),
                                '你可以选择一名其他角色，你与其分别从“重铸”、“苦肉”、“弃牌”中选择一项执行',
                                lib.filter.notMe
                            ).set('ai', function (target) {
                                var player = _status.event.player;
                                if (player.hp > 1 || player.countCards('h') > 2) return get.attitude(player, target) > 0 ? 1 : -0.5;
                                return 0;
                            }).forResult();

                            if (!chooseTargetResult.bool || !chooseTargetResult.targets.length) return;
                            var target = chooseTargetResult.targets[0];
                            player.logSkill('ms_shujie', target);

                            var controls = ['重铸一牌', '发动苦肉', '弃置两牌'];

                            var executeChoice = async function (current, choice) {
                                if (choice === '重铸一牌') {
                                    if (current.countCards('he') > 0) {
                                        // 【核心修复】：改用 chooseCard 选牌，配合原生的 recast 接口
                                        var chooseResult = await current.chooseCard('he', 1, '数劫：请选择一张牌重铸').forResult();
                                        if (chooseResult.bool) {
                                            // 引擎原生的 recast 会自动将牌置入弃牌堆（定性为 recast 事件），并自动执行摸一张牌
                                            await current.recast(chooseResult.cards);
                                        }
                                    }
                                } else if (choice === '发动苦肉') {
                                    await current.loseHp(1);
                                    await current.draw(2);
                                } else if (choice === '弃置两牌') {
                                    if (current.countCards('he') > 0) {
                                        // 三选项保持 chooseToDiscard，确保该选项能够正常计入轮启
                                        await current.chooseToDiscard(2, 'he', true, '数劫：请弃置两张牌');
                                    }
                                }
                            };

                            var pChoose = await player.chooseControl(controls).set('prompt', '数劫：请选择你要执行的选项').set('ai', function () {
                                var player = _status.event.player;
                                if (player.countCards('he') === 0) return '弃置两牌';
                                if (player.hp > 2) return '发动苦肉';
                                return '重铸一牌';
                            }).forResult();

                            var pChoice = pChoose.control;
                            await executeChoice(player, pChoice);

                            if (!target.isIn() || !player.isIn()) return;

                            controls.remove(pChoice);

                            var tChoose = await target.chooseControl(controls).set('prompt', '数劫：请选择你要执行的选项').set('ai', function () {
                                var target = _status.event.player;
                                var controls = _status.event.controls;
                                if (controls.includes('弃置两牌') && target.countCards('he') === 0) return '弃置两牌';
                                if (controls.includes('重铸一牌') && target.countCards('he') > 0) return '重铸一牌';
                                if (controls.includes('发动苦肉') && target.hp > 1) return '发动苦肉';
                                if (controls.includes('弃置两牌')) return '弃置两牌';
                                return controls[0];
                            }).forResult();

                            var tChoice = tChoose.control;
                            await executeChoice(target, tChoice);
                        }
                    },

                    // ================= 轮启 (主技能与可视化记录器) =================
                    "ms_lunqi": {
                        // 【核心新增】：开启面板标记，实时显示收集进度
                        mark: true,
                        intro: {
                            name: "轮启记录器",
                            content: function (storage, player) {
                                if (!player.storage.ms_lunqi_cards || !player.storage.ms_lunqi_cards.length) return "本回合尚未记录任何弃牌";
                                // 过滤掉那些曾经弃置但后来被顺手、洗牌离开弃牌堆的卡牌
                                var cards = player.storage.ms_lunqi_cards.filter(function (c) { return get.position(c) === 'd'; });
                                if (!cards.length) return "已记录的弃牌均已离开弃牌堆";

                                var suits = [];
                                for (var i = 0; i < cards.length; i++) {
                                    var s = get.suit(cards[i]);
                                    if (s && s !== 'none') suits.add(get.translation(s)); // 转化为中文：黑桃、红桃等
                                }
                                return "当前记录有效弃牌数：<span style='color:yellow'>" + cards.length + "</span> 张<br>已集齐花色：<span style='color:orange'>" + (suits.length ? suits.join("、") : "无") + "</span>";
                            }
                        },
                        // 采用官方 API 的复合弃牌事件监听
                        trigger: { global: ["loseAfter", "loseAsyncAfter"] },
                        filter: function (event, player) {
                            // 1. 严格限定必须是“弃置”事件
                            if (event.type !== 'discard') return false;
                            if (player.hasSkill('ms_lunqi_used')) return false;

                            // 2. 确保本次事件中，真的有牌稳稳落入了弃牌堆（d区）
                            var hasD = false;
                            game.countPlayer(function (current) {
                                var evt = event.getl(current);
                                if (evt && evt.cards2 && evt.cards2.filterInD('d').length > 0) {
                                    hasD = true;
                                }
                            });
                            if (!hasD) return false;

                            // 3. 检查记录器中的牌是否已经凑齐四花色
                            // （由于跟踪器优先级为 10，此时最新的弃牌已经进入了账本，所以只要总花色达标就能直接触发）
                            if (!player.storage.ms_lunqi_cards) return false;
                            var cards = player.storage.ms_lunqi_cards.filter(function (c) { return get.position(c) === 'd'; });
                            var suits = [];
                            for (var i = 0; i < cards.length; i++) {
                                var s = get.suit(cards[i]);
                                if (s && s !== 'none') suits.add(s);
                            }
                            return suits.includes('spade') && suits.includes('heart') && suits.includes('club') && suits.includes('diamond');
                        },
                        prompt: "本回合的弃牌已集齐四花色，是否各获得一张，并追加出牌阶段？",
                        async content(event, trigger, player) {
                            // 【修复】：使用官方标准的 phaseAfter，确保回合结束时自动解除每回合限一次的限制
                            player.addTempSkill('ms_lunqi_used', 'phaseAfter');

                            var cards = player.storage.ms_lunqi_cards.filter(function (c) { return get.position(c) === 'd'; });
                            // ... (后续选牌代码保持不变) ...

                            var chooseResult = await player.chooseButton(['轮启：请选择每种花色的弃牌各一张', cards], 4)
                                .set('filterButton', function (button) {
                                    // 动态过滤机制：确保选出的 4 张牌花色绝对互异
                                    for (var i = 0; i < ui.selected.buttons.length; i++) {
                                        if (get.suit(ui.selected.buttons[i].link) === get.suit(button.link)) return false;
                                    }
                                    return true;
                                })
                                .set('ai', function (button) {
                                    return get.value(button.link);
                                })
                                .set('forced', true)
                                .forResult();

                            if (chooseResult.bool && chooseResult.links && chooseResult.links.length === 4) {
                                player.logSkill('ms_lunqi');
                                await player.gain(chooseResult.links, 'gain2');
                                player.addSkill('ms_lunqi_extra'); // 追加出牌阶段
                            }
                        },
                        group: ["ms_lunqi_track", "ms_lunqi_clear"]
                    },

                    // ================= 轮启·跟踪器 (静默记账并刷新UI) =================
                    // ================= 轮启·跟踪器 (静默记账并刷新UI) =================
                    "ms_lunqi_track": {
                        trigger: { global: ["loseAfter", "loseAsyncAfter"] },
                        priority: 10, // 极高优先级，主技能结算前先更新花色库
                        forced: true, silent: true, popup: false,
                        filter: function (event, player) {
                            return event.type === 'discard';
                        },
                        content: function (event, trigger, player) {
                            if (!player.storage.ms_lunqi_cards) player.storage.ms_lunqi_cards = [];

                            var added = false;
                            // 遍历所有在本次事件中弃牌的角色，抓取落入弃牌堆的卡牌
                            game.countPlayer(function (current) {
                                var evt = trigger.getl(current);
                                if (evt && evt.cards2) {
                                    var dCards = evt.cards2.filterInD('d');
                                    if (dCards.length > 0) {
                                        player.storage.ms_lunqi_cards.addArray(dCards);
                                        added = true;
                                    }
                                } // <-- 修复：这里原本写错了，if 语句只需用 } 闭合
                            });

                            // 只要有新弃牌进账，立刻通知引擎刷新 UI 头像上的花色显示
                            if (added) {
                                player.markSkill('ms_lunqi');
                            }
                        }
                    },

                    // ================= 轮启·清道夫 (每当任何人的回合彻底结束时，清空账本) =================
                    "ms_lunqi_clear": {
                        // 【核心修复】：换成正统的无名杀回合结束全局事件 phaseAfter
                        trigger: { global: "phaseAfter" },
                        priority: -10,
                        forced: true, silent: true, popup: false,
                        content: function (event, trigger, player) {
                            player.storage.ms_lunqi_cards = [];
                            player.unmarkSkill('ms_lunqi'); // 刷新 UI 标记，彻底清零
                        }
                    },

                    // ================= 轮启·追加阶段 (当拿到牌后的追击爆发) =================
                    "ms_lunqi_extra": {
                        // 【核心修复】：同样换成 phaseAfter，确保回合结束时准时蹦出出牌阶段
                        trigger: { global: "phaseAfter" },
                        forced: true, silent: true, popup: false,
                        content: async function (event, trigger, player) {
                            player.removeSkill('ms_lunqi_extra');
                            game.log(player, '触发了', '#g【轮启】', '的追加出牌阶段');
                            await player.phaseUse();
                        }
                    }
                },
                // 无名杀引擎也允许把技能翻译写在 skill.translate 里，如果你习惯统一写在 character.translate 里，这里留空即可
                translate: {
                    "ms_zhangbi": "障壁",
                    "ms_zhangbi_info": "<b>锁定技</b>，你的装备区为七个可以适配任意装备牌的装备栏；游戏开始时，你随机使用七张装备牌。",
                    "ms_jiaoxin": "交心",
                    "ms_jiaoxin_info": "你使用【杀】发动武器，或被使用【杀】发动防具后：可以将发动的装备牌移入对方的对应装备栏，然后你弃置其两张手牌并视为对其使用一张【杀】。",

                    "ms_qinfan": "侵犯",
                    "ms_qinfan_info": "<b>锁定技，</b>出牌阶段开始时，你将所有手牌随机扣置于角色牌上，你只能观看和使用其最顶上的牌（无次数与距离限制），此阶段结束后，你获得角色牌上的牌。",

                    "ms_tianjiao": "天骄",
                    "ms_tianjiao_info": "你每回合首次使用一种类型的牌后，可以摸三张牌，然后若此时是你的出牌阶段，你将三张牌扣置于角色牌上的最底部。",

                    // 以下为隐藏的衍生机制技能（不需要加 _info，因为玩家不需要看它们的描述）
                    "ms_qinfan_flow": "侵犯流转",
                    "ms_qinfan_mod": "侵犯强化",
                    "ms_qinfan_end": "侵犯收尾",
                    "ms_tianjiao_clear": "天骄清理",


                    "ms_zhanmeng": "占梦",
                    "ms_zhanmeng_info": "出牌阶段，每种牌名每回合限一次，你可以展示所有角色各一张手牌。若其中任意张牌的牌名字数和等于被展示牌中的一张普通锦囊或基本牌的点数，则你可以将这些牌弃置，当做此牌使用。若展示后你未使用，此技能失效，直到你下一次使用任意牌结算后解除失效状态。",

                    "ms_liangfu": "良妇",
                    "ms_liangfu_info": "每回合你首次使用的牌进入弃牌堆后，你可以将此牌交给一名角色。",

                    // 以下为静默的隐藏机制名
                    "ms_zhanmeng_mod": "占梦强化",
                    "ms_zhanmeng_reset": "占梦清理",
                    "ms_zhanmeng_reset_disabled_only": "占梦解禁",
                    "ms_liangfu_clear": "良妇重置",

                    "ms_duojia": "多驾",
                    "ms_duojia_info": "<b>锁定技，阴阳技。</b><br>阴: 你的体力值始终等于手牌数；<br>阳: 你的手牌数始终等于体力值。<br>你抵消其他角色或其他角色抵消你使用的牌后，切换此技能的状态。",

                    "ms_duojia_init": "多驾初始化",
                    "ms_duojia_sync": "多驾同步",
                    "ms_duojia_toggle": "多驾切换",

                    "ms_fuzui": "抚罪",
                    "ms_fuzui_info": "当你造成或受到伤害后，你可以令造成伤害的角色摸 X 张牌并交给受伤角色一张手牌（X 为受伤角色手牌中缺失的花色数）。",

                    "ms_chiming": "迟鸣",
                    "ms_chiming_info": "出牌阶段限两次，若你有手牌，你可以观看一名其他角色的手牌并选择一项：<br>1. 弃置其中四张花色各不相同的牌，并对其造成 1 点伤害，此技能本回合使用次数上限 +1。<br>2.交给其任意张手牌，若本回合已经以此法交出第二张牌，你可以使用一张基本牌。。",

                    "ms_chiming_clear": "迟鸣重置",

                    "ms_canshi": "蚕食",
                    "ms_canshi_info": "<span style='color: purple;'>其他角色</span>出牌阶段开始时，你可以令<span style='color: purple;'>其</span>本阶段可以观看并使用你的手牌；若如此做，你的下个出牌阶段也可以观看并使用<span style='color: purple;'>其</span>的手牌。",
                    "ms_canshi_active": "蚕食",
                    "ms_canshi_active_info": "观看并使用目标角色的手牌。",

                    "ms_juzhao": "聚召",
                    "ms_juzhao_info": "<b>锁定技，转换技，</b><br>1.阳：你使用牌时，令此牌无次数限制；<br>2.阴：出牌阶段，你不能使用牌，你可以令一名其他角色使用一张牌。<br>每回合每名角色限一次，一名角色因此使用牌后，你可以与一名手牌数与你相等的其它角色各摸一张牌，或摸一张牌。",
                    "ms_juzhao_active": "聚召",

                    "ms_zixiang": "自相",
                    "ms_zixiang_info": "<b>锁定技</b>，若本轮你脱离过濒死，或者当前是第一轮，则你的体力值不为正数时也不会濒死；你的手牌上限为体力值的绝对值。",
                    "ms_cuidu": "淬毒",
                    "ms_cuidu_info": "<b>锁定技</b>，若你的体力值：1.大于等于零，你使用基本牌无次数限制，且结算后二分之一概率失去三点体力；2.小于等于零，你使用非基本牌时摸两张牌，且结算后二分之一概率回复三点体力。",


                    "ms_sibu": "死簿",
                    "ms_sibu_info": "每回合限一次，当一名角色受到不因此技能受到的伤害时，你可以防止之，然后记录此伤害；<br>出牌阶段限一次，你可以执行记录的所有伤害，然后你可以清除记录；<br>你受到伤害后，必须执行记录的所有伤害，然后你可以清除记录。",
                    "ms_sibu_active": "死簿",
                    "ms_sibu_passive": "死簿反噬",
                    "ms_sibu_used": "死簿封印",

                    "ms_mishi": "迷失",
                    "ms_mishi_info": "出牌阶段，你可以展示牌堆顶四张牌，并决定使用其中一张牌和一名其它角色作为目标，令目标猜测你使用的哪张牌：<br>若猜测正确，此技能本回合失效<br>若猜测错误，你对其使用这张牌。",
                    "ms_mishi_clear": "迷失重置",

                    "ms_zhaomu": "招募",
                    "ms_zhaomu_info": "你的阶段开始前，你可以弃置一张牌跳过之；你跳过回合内前 X 个阶段时，可以移动场上一张牌。跳过回合内后 X 个阶段时，可以视为使用一张【杀】；你的回合结束时，若你本回合未使用过非装备的手牌，你摸 X 张牌。（X 为你场上的牌数）。",
                    "ms_huanlve": "缓略",
                    "ms_huanlve_info": "当你需要使用或打出基本牌时，你可以将一张牌当任意延时锦囊牌对自己使用，视为你使用或打出了一张此基本牌。",

                    // 衍生标
                    "ms_zhaomu_monitor": "招募监测",
                    "ms_zhaomu_end": "招募摸牌",
                    "ms_zhaomu_clear": "招募清零",

                    "ms_zhashi": "查势",
                    "ms_zhashi_info": "<b>锁定技</b>，当一名角色体力值变化后，若其体力值全场最低，你摸一张牌。",
                    "ms_xueqie": "雪切",
                    "ms_xueqie_info": "出牌阶段内，若一名角色的体力值与你：<br>1.不相等，你使用伤害牌可以额外指定其为无距离限制的目标；<br>2.相等，你对其使用的【杀】选择附加以下 X 个效果（X 为你已损失体力值）。<br>①.对目标的伤害+1；②.不可响应；③.无次数限制。",

                    "ms_suiliu": "随流",
                    "ms_suiliu_info": "<span style=\"color: red;\"><b>锁定技，</b>你的</span>结束与准备、<span style=\"color: red;\">判定、摸牌、弃牌阶段改为出牌阶段，出牌阶段开始时，你摸一张牌或使用一张牌，然后立刻结束此阶段。</span>每回合你首次受到或造成伤害后，可以令一名无<b>“随流”</b>角色获得只有红色字体的<b>“随流”</b>直到其下个回合结束。",
                    "ms_suiliu_red": "随流",
                    "ms_suiliu_red_info": "<span style=\"color: red;\"><b>锁定技，</b>你的判定、摸牌、弃牌阶段改为出牌阶段，出牌阶段开始时，你摸一张牌或使用一张牌，然后立刻结束此阶段。</span>",

                    "ms_shujie": "数劫",
                    "ms_shujie_info": "你的任意阶段开始时，你可以执行以下一项，然后让另一名角色选择执行另一项（其从另外两项里面选择一项执行）：<br>1.重铸一张牌；<br>2.发动一次<b>苦肉</b>；<br>3.弃置两张牌。",
                    // 注册选项的翻译
                    "ms_shujie_recast": "重铸一牌",
                    "ms_shujie_kurou": "发动苦肉",
                    "ms_shujie_discard": "弃置两牌",
                    "ms_lunqi": "轮启",
                    "ms_lunqi_info": "每回合限一次，任意回合因弃置而进入弃牌堆的牌集齐四花色时，你可以获得其中每种花色的牌各一张，若如此做，你于此回合结束后追加一个出牌阶段。",

                }
            }
        },

        // ================= 【资源预加载层】 =================
        files: {
            character: [
                "ms_yuzaki",
                "ms_jianchunxia",
                "ms_jiantongying",
                "ms_yitoucheng",
                "ms_youjiaxiaoxue",
                "ms_yuka",
                "ms_minato",
                "ms_pianpian",
                "ms_naimei",
                "ms_poernuo",
                "ms_xiyuansishijie",
                "ms_xishiliang",
                "ms_aoliyeta"
            ],
            card: [],
            skill: []
        }
    };
});
