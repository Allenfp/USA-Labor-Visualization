from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, render_template, jsonify

engine = create_engine("sqlite:///oes.db")

Base = automap_base()
Base.prepare(engine, reflect=True)

Data = Base.classes.data

session = Session(engine)

app = Flask(__name__)

#Return to Home Page################################################################################################
@app.route("/")
def home():

    return render_template("index.html")

# Front Page National Information  ################################################################################
@app.route("/national") 
def national_info():

    data_list = [] 
    data_dict = {
        "data07" : [],
        "data16" : []
    }

    data07 = session.execute("SELECT occtitle, SUM(REPLACE(totalemp, ',', '')) from Data WHERE year=:param GROUP BY occtitle",{"param":"5/31/07"}).fetchall()
    
    for data in data07:
        x = {data[0] : data[1]}
        data_list.append(x)

    data_dict["data07"] = data_list

    data_list = []

    data16 = session.execute("SELECT occtitle, SUM(REPLACE(totalemp, ',', '')) from Data WHERE year=:param GROUP BY occtitle",{"param":"5/31/16"}).fetchall()
    
    for data in data16:
        x = {data[0] : data[1]}
        data_list.append(x)

    data_dict["data16"] = data_list

    return jsonify(data_dict)

#State Information over Entire Period #############################################################################

@app.route("/state/<state>") 
def state_info(state):

    data_list = [] 
    data_dict = {
        "data07" : [],
        "data16" : []
    }

    data07 = session.execute("SELECT occtitle, SUM(REPLACE(totalemp, ',', '')) from Data WHERE year=:param1 AND state=:param2 GROUP BY occtitle",{"param1":"5/31/07","param2":state}).fetchall()
    
    for data in data07:
        x = {data[0] : data[1]}
        data_list.append(x)

    data_dict["data07"] = data_list

    data_list = []

    data16 = session.execute("SELECT occtitle, SUM(REPLACE(totalemp, ',', '')) from Data WHERE year=:param GROUP BY occtitle",{"param":"5/31/16","param2":state}).fetchall()
    
    for data in data16:
        x = {data[0] : data[1]}
        data_list.append(x)

    data_dict["data16"] = data_list

    return jsonify(data_dict)

# Single State Single Year Information ##############################################################################

@app.route("/state/<state>/year/<year>")
def stateyear_info(state, year):

    year_dict = {
        "08":"07",
        "09":"08",
        "10":"09",
        "11":"10",
        "12":"11",
        "13":"12",
        "14":"13",
        "15":"14",
        "16":"15"

    }

    data_list = [] 
    data_dict = {
        "BaseYear" : [],
        "MeasurementYear" : []
    }

    base_year = session.execute("SELECT occtitle, SUM(REPLACE(totalemp, ',', '')) from Data WHERE year=:param1 AND state=:param2 GROUP BY occtitle",{"param1":"5/31/"+year_dict[str(year)],"param2":state}).fetchall()
    
    for data in base_year:
        x = {data[0] : data[1]}
        data_list.append(x)

    data_dict["BaseYear"] = data_list

    data_list = []

    measurement_year = session.execute("SELECT occtitle, SUM(REPLACE(totalemp, ',', '')) from Data WHERE year=:param1 AND state=:param2 GROUP BY occtitle",{"param1":"5/31/"+year,"param2":state}).fetchall()
    
    for data in measurement_year:
        x = {data[0] : data[1]}
        data_list.append(x)

    data_dict["MeasurementYear"] = data_list

    return jsonify(data_dict)

if __name__ == "__main__":
    app.run(debug=True)