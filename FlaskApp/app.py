from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, render_template, jsonify
import json
from datetime import datetime

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

@app.route("/data")
def data():

    return render_template("data.html")


# Front Page National Information  ################################################################################
@app.route("/national") 
def national_info():

    data_dict7 = {}
    data_dict16 = {}
    data_dict = {}

    data07 = session.execute("SELECT occtitle, SUM(REPLACE(totalemp, ',', '')) from Data WHERE year=:param GROUP BY occtitle",{"param":"5/31/07"}).fetchall()
    
    for data in data07:
        data_dict7[data[0]] = int(data[1])

    data16 = session.execute("SELECT occtitle, SUM(REPLACE(totalemp, ',', '')) from Data WHERE year=:param GROUP BY occtitle",{"param":"5/31/16"}).fetchall()
    
    for data in data16:
        data_dict16[data[0]] = int(data[1])

    data_dict["2007"] = data_dict7
    data_dict["2016"] = data_dict16
    

    return jsonify(data_dict)

#State Information over Entire Period #############################################################################

@app.route("/state/<state>") 
def state_info(state):
    query_result = (session.query(Data.occtitle, Data.totalemp, Data.year).filter(Data.state == state).all())
    mydata = []
    for row in query_result:
        date_object = datetime.strptime(row.year, '%m/%d/%y')
        year = int(date_object.strftime('%Y'))
        mydata.append({
            "year": year,
            "occupation": row.occtitle,
            "totalemp": row.totalemp 
        })
    return json.dumps(mydata, separators=(',',':'))


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

    data_dict = {}
    BaseYear_dict= {}
    MeasurementYear_dict = {}

    base_year = session.execute("SELECT occtitle, SUM(REPLACE(totalemp, ',', '')) from Data WHERE year=:param1 AND state=:param2 GROUP BY occtitle",{"param1":"5/31/"+year_dict[str(year)],"param2":state}).fetchall()
    
    for data in base_year:
        BaseYear_dict[data[0]] = int(data[1])

    measurement_year = session.execute("SELECT occtitle, SUM(REPLACE(totalemp, ',', '')) from Data WHERE year=:param1 AND state=:param2 GROUP BY occtitle",{"param1":"5/31/"+year,"param2":state}).fetchall()
    
    for data in measurement_year:
        MeasurementYear_dict[data[0]] = int(data[1])

    data_dict["baseYear"] = BaseYear_dict
    data_dict["measurementYear"] = MeasurementYear_dict
    
    return jsonify(data_dict)

if __name__ == "__main__":
    app.run(debug=True)